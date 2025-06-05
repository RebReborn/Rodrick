"use client";

import type React from 'react';
import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import type { WindowInstance, AppDefinition } from '@/types';
import { appRegistry } from '@/config/appRegistry'; // We'll create this next

interface WindowManagerContextType {
  windows: WindowInstance[];
  openWindow: (appKey: string, additionalProps?: Partial<Omit<WindowInstance, 'id' | 'appKey' | 'content' | 'icon' | 'title' | 'x' | 'y' | 'width' | 'height' | 'zIndex' | 'isActive' | 'isMinimized' | 'isMaximized' | 'isDragging' | 'isResizing'>>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  setDraggingState: (id: string, isDragging: boolean) => void;
  setResizingState: (id: string, isResizing: boolean) => void;
  getAppDefinition: (appKey: string) => AppDefinition | undefined;
  bringToFront: (id: string) => void;
  activeWindowId: string | null;
}

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

const INITIAL_Z_INDEX = 10;
const Z_INDEX_INCREMENT = 1;

export const WindowManagerProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [nextZIndex, setNextZIndex] = useState<number>(INITIAL_Z_INDEX);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const getAppDefinition = useCallback((appKey: string): AppDefinition | undefined => {
    return appRegistry.find(app => app.key === appKey);
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prevWindows => {
      const windowToFocus = prevWindows.find(w => w.id === id);
      if (!windowToFocus || windowToFocus.zIndex === nextZIndex - Z_INDEX_INCREMENT) {
        // Already at the front or only one window
        return prevWindows.map(w => ({ ...w, isActive: w.id === id }));
      }
      
      const newZIndex = nextZIndex;
      setNextZIndex(prev => prev + Z_INDEX_INCREMENT);

      return prevWindows.map(w => {
        if (w.id === id) {
          return { ...w, zIndex: newZIndex, isActive: true };
        }
        // Demote other windows that were on top or equal
        return { ...w, isActive: false };
      });
    });
    setActiveWindowId(id);
  }, [nextZIndex]);


  const openWindow = useCallback((appKey: string, additionalProps?: Partial<Omit<WindowInstance, 'id' | 'appKey' | 'content' | 'icon' | 'title' | 'x' | 'y' | 'width' | 'height' | 'zIndex' | 'isActive' | 'isMinimized' | 'isMaximized' | 'isDragging' | 'isResizing'>>) => {
    const appDef = getAppDefinition(appKey);
    if (!appDef) {
      console.error(`App definition not found for key: ${appKey}`);
      return;
    }

    const existingWindow = windows.find(w => w.appKey === appKey && !w.isMinimized);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      if(windows.find(w => w.id === existingWindow.id)?.isMinimized) {
         setWindows(prev => prev.map(w => w.id === existingWindow.id ? { ...w, isMinimized: false } : w));
      }
      return;
    }
    
    const existingMinimizedWindow = windows.find(w => w.appKey === appKey && w.isMinimized);
    if (existingMinimizedWindow) {
      setWindows(prev => prev.map(w => w.id === existingMinimizedWindow.id ? { ...w, isMinimized: false } : w));
      bringToFront(existingMinimizedWindow.id);
      return;
    }


    const newWindowId = `${appKey}-${Date.now()}`;
    const newZ = nextZIndex;
    setNextZIndex(prev => prev + Z_INDEX_INCREMENT);

    const defaultWidth = appDef.defaultSize?.width || 600;
    const defaultHeight = appDef.defaultSize?.height || 400;

    const newWindow: WindowInstance = {
      id: newWindowId,
      appKey,
      title: appDef.name,
      icon: appDef.icon,
      content: <appDef.component windowId={newWindowId} appKey={appKey} />,
      x: additionalProps?.x ?? Math.max(0, (window.innerWidth / 2) - (defaultWidth / 2) + (windows.length % 5) * 20),
      y: additionalProps?.y ?? Math.max(0, (window.innerHeight / 2) - (defaultHeight / 2) - 50 + (windows.length % 5) * 20),
      width: additionalProps?.width ?? defaultWidth,
      height: additionalProps?.height ?? defaultHeight,
      minWidth: appDef.minSize?.width || 300,
      minHeight: appDef.minSize?.height || 200,
      zIndex: newZ,
      isMinimized: false,
      isMaximized: false,
      isActive: true,
      isDragging: false,
      isResizing: false,
      isFocusedOnMount: true,
      ...additionalProps,
    };

    setWindows(prevWindows => [...prevWindows.map(w => ({ ...w, isActive: false })), newWindow]);
    setActiveWindowId(newWindowId);
  }, [getAppDefinition, windows, nextZIndex, bringToFront]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prevWindows => prevWindows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      // Focus the next highest z-index window or clear active
      const remainingWindows = windows.filter(w => w.id !== id);
      if (remainingWindows.length > 0) {
        const topWindow = remainingWindows.reduce((max, w) => w.zIndex > max.zIndex ? w : max, remainingWindows[0]);
        setActiveWindowId(topWindow.id);
        bringToFront(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  }, [activeWindowId, windows, bringToFront]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prevWindows => prevWindows.map(w => (w.id === id ? { ...w, isMinimized: true, isActive: false } : w)));
     if (activeWindowId === id) {
      const otherWindows = windows.filter(w => w.id !== id && !w.isMinimized);
      if (otherWindows.length > 0) {
        const topWindow = otherWindows.reduce((max, w) => w.zIndex > max.zIndex ? w : max, otherWindows[0]);
        bringToFront(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  }, [activeWindowId, windows, bringToFront]);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prevWindows =>
      prevWindows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized, isMinimized: false } : w
      )
    );
    bringToFront(id);
  }, [bringToFront]);

  const toggleMaximizeWindow = useCallback((id: string) => {
    setWindows(prevWindows =>
      prevWindows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized, isMinimized: false } : w
      )
    );
    if (!windows.find(w => w.id === id)?.isMaximized) {
        bringToFront(id);
    }
  }, [bringToFront, windows]);

  const focusWindow = useCallback((id: string) => {
    const windowToFocus = windows.find(w => w.id === id);
    if (windowToFocus) {
      if (windowToFocus.isMinimized) {
        setWindows(prevWindows => prevWindows.map(w => (w.id === id ? { ...w, isMinimized: false } : w)));
      }
      bringToFront(id);
    }
  }, [windows, bringToFront]);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prevWindows =>
      prevWindows.map(w => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows(prevWindows =>
      prevWindows.map(w => (w.id === id ? { ...w, width, height } : w))
    );
  }, []);

  const setDraggingState = useCallback((id: string, isDragging: boolean) => {
    setWindows(prevWindows =>
      prevWindows.map(w => (w.id === id ? { ...w, isDragging } : w))
    );
  }, []);

  const setResizingState = useCallback((id: string, isResizing: boolean) => {
    setWindows(prevWindows =>
      prevWindows.map(w => (w.id === id ? { ...w, isResizing } : w))
    );
  }, []);
  
  const contextValue = useMemo(() => ({
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    setDraggingState,
    setResizingState,
    getAppDefinition,
    bringToFront,
    activeWindowId,
  }), [windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, toggleMaximizeWindow, focusWindow, updateWindowPosition, updateWindowSize, setDraggingState, setResizingState, getAppDefinition, bringToFront, activeWindowId]);


  return (
    <WindowManagerContext.Provider value={contextValue}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (context === undefined) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
};
