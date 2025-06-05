"use client";

import type React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import type { WindowInstance } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WindowProps {
  instance: WindowInstance;
}

const WindowComponent: React.FC<WindowProps> = ({ instance }) => {
  const {
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    setDraggingState,
    setResizingState,
    bringToFront,
    activeWindowId,
  } = useWindowManager();

  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);

  const [initialDragPos, setInitialDragPos] = useState<{ x: number; y: number } | null>(null);
  const [initialWindowPos, setInitialWindowPos] = useState<{ x: number; y: number } | null>(null);
  
  const [initialResizePos, setInitialResizePos] = useState<{ x: number; y: number } | null>(null);
  const [initialWindowSize, setInitialWindowSize] = useState<{ width: number; height: number } | null>(null);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);

  const isAppActive = activeWindowId === instance.id;

  useEffect(() => {
    if (instance.isFocusedOnMount) {
      bringToFront(instance.id);
    }
  }, [instance.id, instance.isFocusedOnMount, bringToFront]);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === titleBarRef.current || titleBarRef.current?.contains(e.target as Node)) {
      if (instance.isMaximized) return; // Don't drag if maximized

      setDraggingState(instance.id, true);
      setInitialDragPos({ x: e.clientX, y: e.clientY });
      setInitialWindowPos({ x: instance.x, y: instance.y });
      bringToFront(instance.id);
      e.preventDefault();
    }
  };
  
  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    if (instance.isMaximized) return;

    setResizingState(instance.id, true);
    setInitialResizePos({ x: e.clientX, y: e.clientY });
    setInitialWindowSize({ width: instance.width, height: instance.height });
    setResizeDirection(direction);
    bringToFront(instance.id);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (instance.isDragging && initialDragPos && initialWindowPos) {
      const dx = e.clientX - initialDragPos.x;
      const dy = e.clientY - initialDragPos.y;
      const newX = Math.max(0, initialWindowPos.x + dx);
      // Ensure window title bar stays visible (approx 32px height)
      const newY = Math.max(0, initialWindowPos.y + dy);
      updateWindowPosition(instance.id, newX, newY);
    } else if (instance.isResizing && initialResizePos && initialWindowSize && resizeDirection) {
        const dx = e.clientX - initialResizePos.x;
        const dy = e.clientY - initialResizePos.y;

        let newWidth = initialWindowSize.width;
        let newHeight = initialWindowSize.height;
        let newX = instance.x;
        let newY = instance.y;

        const minWidth = instance.minWidth || 200;
        const minHeight = instance.minHeight || 150;

        if (resizeDirection.includes("right")) newWidth = Math.max(minWidth, initialWindowSize.width + dx);
        if (resizeDirection.includes("bottom")) newHeight = Math.max(minHeight, initialWindowSize.height + dy);
        if (resizeDirection.includes("left")) {
            newWidth = Math.max(minWidth, initialWindowSize.width - dx);
            if (newWidth > minWidth) newX = instance.x + dx;
        }
        if (resizeDirection.includes("top")) {
            newHeight = Math.max(minHeight, initialWindowSize.height - dy);
            if (newHeight > minHeight) newY = instance.y + dy;
        }
        
        updateWindowSize(instance.id, newWidth, newHeight);
        if (newX !== instance.x || newY !== instance.y) {
          updateWindowPosition(instance.id, newX, newY);
        }
    }
  }, [instance, initialDragPos, initialWindowPos, initialResizePos, initialWindowSize, resizeDirection, updateWindowPosition, updateWindowSize]);

  const handleMouseUp = useCallback(() => {
    if (instance.isDragging) {
      setDraggingState(instance.id, false);
      setInitialDragPos(null);
      setInitialWindowPos(null);
    }
    if (instance.isResizing) {
      setResizingState(instance.id, false);
      setInitialResizePos(null);
      setInitialWindowSize(null);
      setResizeDirection(null);
    }
  }, [instance.id, instance.isDragging, instance.isResizing, setDraggingState, setResizingState]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (instance.isMinimized) {
    return null;
  }

  const windowStyle: React.CSSProperties = instance.isMaximized ? {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'calc(100vw - 2px)', // Account for potential borders
    height: 'calc(100vh - 42px - 2px)', // Account for taskbar and borders
    zIndex: instance.zIndex,
    transition: 'width 0.2s ease-out, height 0.2s ease-out, top 0.2s ease-out, left 0.2s ease-out',
  } : {
    position: 'absolute',
    left: instance.x,
    top: instance.y,
    width: instance.width,
    height: instance.height,
    zIndex: instance.zIndex,
    minWidth: instance.minWidth,
    minHeight: instance.minHeight,
    transition: instance.isDragging || instance.isResizing ? 'none' : 'opacity 0.2s ease-out, transform 0.2s ease-out',
  };

  const resizeHandleClasses = "absolute bg-transparent z-10";
  const resizeHandles = [
    { direction: "top-left", className: "cursor-nwse-resize top-0 left-0 w-2 h-2" },
    { direction: "top", className: "cursor-ns-resize top-0 left-1/2 -translate-x-1/2 w-full h-1" },
    { direction: "top-right", className: "cursor-nesw-resize top-0 right-0 w-2 h-2" },
    { direction: "left", className: "cursor-ew-resize top-1/2 -translate-y-1/2 left-0 w-1 h-full" },
    { direction: "right", className: "cursor-ew-resize top-1/2 -translate-y-1/2 right-0 w-1 h-full" },
    { direction: "bottom-left", className: "cursor-nesw-resize bottom-0 left-0 w-2 h-2" },
    { direction: "bottom", className: "cursor-ns-resize bottom-0 left-1/2 -translate-x-1/2 w-full h-1" },
    { direction: "bottom-right", className: "cursor-nwse-resize bottom-0 right-0 w-2 h-2" },
  ];

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      className={cn(
        'flex flex-col bg-card text-card-foreground rounded-lg shadow-window overflow-hidden border',
        isAppActive ? 'border-primary ring-1 ring-primary' : 'border-border',
        instance.isMaximized ? 'rounded-none' : '',
        'animate-window-open'
      )}
      onClick={() => {if (!isAppActive) bringToFront(instance.id)}}
      onMouseDownCapture={() => {if (!isAppActive) bringToFront(instance.id)}}
    >
      <div
        ref={titleBarRef}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => toggleMaximizeWindow(instance.id)}
        className={cn(
          'h-8 px-2 flex items-center justify-between select-none shrink-0',
          instance.isMaximized ? '' : 'cursor-grab',
          isAppActive ? 'bg-muted/80 dark:bg-muted/30' : 'bg-card dark:bg-card',
          'acrylic-blur', isAppActive ? 'acrylic-light dark:acrylic-dark' : 'bg-opacity-80 dark:bg-opacity-80'
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {instance.icon && <span className="w-4 h-4">{instance.icon}</span>}
          <span className="text-xs font-medium truncate">{instance.title}</span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none hover:bg-secondary/50" onClick={(e) => { e.stopPropagation(); minimizeWindow(instance.id); }} aria-label="Minimize">
            <Minus size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none hover:bg-secondary/50" onClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(instance.id); }} aria-label={instance.isMaximized ? "Restore" : "Maximize"}>
            {instance.isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none hover:bg-destructive/80 hover:text-destructive-foreground" onClick={(e) => { e.stopPropagation(); closeWindow(instance.id); }} aria-label="Close">
            <X size={16} />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-auto relative bg-background">
        {instance.content}
      </div>
      {!instance.isMaximized && resizeHandles.map(handle => (
          <div
            key={handle.direction}
            className={cn(resizeHandleClasses, handle.className)}
            onMouseDown={(e) => handleResizeMouseDown(e, handle.direction)}
          />
        ))}
    </div>
  );
};

export default WindowComponent;
