
"use client";

import React from 'react'; 
import { useEffect, useRef, useState, useCallback } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import type { WindowInstance } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WindowProps {
  instance: WindowInstance;
}

const TASKBAR_HEIGHT = 48; // Define taskbar height as a constant

const WindowComponent: React.FC<WindowProps> = ({ instance }) => {
  const {
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    // focusWindow, // Not directly used for focus triggering here, but for context
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
  
  const handleMouseDownOnTitleBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLElement;
    if (targetElement.closest('button[aria-label]')) { 
        return; 
    }

    if (instance.isMaximized && e.detail === 2) { 
      toggleMaximizeWindow(instance.id);
      return;
    }
    if (instance.isMaximized) return; 


    setDraggingState(instance.id, true);
    setInitialDragPos({ x: e.clientX, y: e.clientY });
    setInitialWindowPos({ x: instance.x, y: instance.y });
    bringToFront(instance.id);
    e.preventDefault();
  };
  
  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    if (instance.isMaximized) return;

    setResizingState(instance.id, true);
    setInitialResizePos({ x: e.clientX, y: e.clientY });
    setInitialWindowSize({ width: instance.width, height: instance.height });
    setInitialWindowPos({ x: instance.x, y: instance.y }); // Store initial position for resize calculations
    setResizeDirection(direction);
    bringToFront(instance.id);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (instance.isDragging && initialDragPos && initialWindowPos) {
      const dx = e.clientX - initialDragPos.x;
      const dy = e.clientY - initialDragPos.y;
      
      const maxTopY = window.innerHeight - TASKBAR_HEIGHT - instance.height;
      const newX = Math.max(0, Math.min(initialWindowPos.x + dx, window.innerWidth - instance.width));
      const newY = Math.max(0, Math.min(initialWindowPos.y + dy, maxTopY));
      updateWindowPosition(instance.id, newX, newY);

    } else if (instance.isResizing && initialResizePos && initialWindowSize && resizeDirection && initialWindowPos) {
        let dx = e.clientX - initialResizePos.x;
        let dy = e.clientY - initialResizePos.y;

        let newWidth = initialWindowSize.width;
        let newHeight = initialWindowSize.height;
        let newX = initialWindowPos.x;
        let newY = initialWindowPos.y;

        const minWidth = instance.minWidth || 200;
        const minHeight = instance.minHeight || 150;

        if (resizeDirection.includes("right")) {
            newWidth = Math.max(minWidth, initialWindowSize.width + dx);
            newWidth = Math.min(newWidth, window.innerWidth - newX); // Cap by screen edge
        }
        if (resizeDirection.includes("left")) {
            const potentialWidth = initialWindowSize.width - dx;
            if (potentialWidth < minWidth) {
                newWidth = minWidth;
                newX = initialWindowPos.x + (initialWindowSize.width - minWidth);
            } else {
                newWidth = potentialWidth;
                newX = initialWindowPos.x + dx;
            }
            if (newX < 0) { // If moving left made x negative
                newWidth = Math.max(minWidth, newWidth + newX); // Correct width, newX is negative
                newX = 0;
            }
        }

        if (resizeDirection.includes("bottom")) {
            newHeight = Math.max(minHeight, initialWindowSize.height + dy);
            newHeight = Math.min(newHeight, window.innerHeight - TASKBAR_HEIGHT - newY); // Cap by taskbar
        }
        if (resizeDirection.includes("top")) {
            const potentialHeight = initialWindowSize.height - dy;
            if (potentialHeight < minHeight) {
                newHeight = minHeight;
                newY = initialWindowPos.y + (initialWindowSize.height - minHeight);
            } else {
                newHeight = potentialHeight;
                newY = initialWindowPos.y + dy;
            }
             if (newY < 0) { // If moving top made y negative
                newHeight = Math.max(minHeight, newHeight + newY); // Correct height, newY is negative
                newY = 0;
            }
        }
        
        updateWindowSize(instance.id, newWidth, newHeight);
        if (newX !== initialWindowPos.x || newY !== initialWindowPos.y) {
          updateWindowPosition(instance.id, newX, newY);
        }
    }
  }, [instance, initialDragPos, initialWindowPos, initialResizePos, initialWindowSize, resizeDirection, updateWindowPosition, updateWindowSize]);

  const handleMouseUpGlobal = useCallback(() => {
    if (instance.isDragging) {
      setDraggingState(instance.id, false);
      setInitialDragPos(null);
      setInitialWindowPos(null);
    }
    if (instance.isResizing) {
      setResizingState(instance.id, false);
      setInitialResizePos(null);
      setInitialWindowSize(null);
      setInitialWindowPos(null);
      setResizeDirection(null);
    }
  }, [instance.id, instance.isDragging, instance.isResizing, setDraggingState, setResizingState]);

  useEffect(() => {
    if (instance.isDragging || instance.isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUpGlobal);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [instance.isDragging, instance.isResizing, handleMouseMove, handleMouseUpGlobal]);

  if (instance.isMinimized) {
    return null;
  }

  const windowStyle: React.CSSProperties = instance.isMaximized ? {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw', 
    height: `calc(100vh - ${TASKBAR_HEIGHT}px)`, 
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
    transition: instance.isDragging || instance.isResizing ? 'none' : 'opacity 0.2s ease-out, transform 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out, top 0.2s ease-out, left 0.2s ease-out',
  };

  const resizeHandleClasses = "absolute bg-transparent z-10";
  const resizeHandles = [
    { direction: "top-left", className: "cursor-nwse-resize top-0 left-0 w-3 h-3 -m-1" },
    { direction: "top-right", className: "cursor-nesw-resize top-0 right-0 w-3 h-3 -m-1" },
    { direction: "bottom-left", className: "cursor-nesw-resize bottom-0 left-0 w-3 h-3 -m-1" },
    { direction: "bottom-right", className: "cursor-nwse-resize bottom-0 right-0 w-3 h-3 -m-1" },
    { direction: "top", className: "cursor-ns-resize top-0 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] h-2 -my-1" },
    { direction: "left", className: "cursor-ew-resize top-1/2 -translate-y-1/2 left-0 w-2 h-[calc(100%-16px)] -mx-1" },
    { direction: "right", className: "cursor-ew-resize top-1/2 -translate-y-1/2 right-0 w-2 h-[calc(100%-16px)] -mx-1" },
    { direction: "bottom", className: "cursor-ns-resize bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] h-2 -my-1" },
  ];
  
  return (
    <div
      ref={windowRef}
      style={windowStyle}
      className={cn(
        'flex flex-col rounded-lg shadow-window overflow-hidden border',
        'dark:bg-neutral-800/90 bg-neutral-100/90', 
        'acrylic-blur acrylic-light dark:acrylic-dark', 
        isAppActive ? 'border-primary ring-1 ring-primary' : 'border-black/10 dark:border-white/10',
        instance.isMaximized ? '!rounded-none' : '', 
        'animate-window-open' 
      )}
      onClick={() => {if (!isAppActive) bringToFront(instance.id)}}
      onMouseDownCapture={() => {if (!isAppActive) bringToFront(instance.id)}} 
    >
      <div
        ref={titleBarRef}
        onMouseDown={handleMouseDownOnTitleBar}
        onDoubleClick={() => toggleMaximizeWindow(instance.id)}
        className={cn(
          'h-8 px-2 flex items-center justify-between select-none shrink-0',
          'bg-white/5 dark:bg-black/10', 
          instance.isMaximized ? '' : 'cursor-grab',
          isAppActive ? 'opacity-100' : 'opacity-90' 
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {instance.icon && React.cloneElement(instance.icon as React.ReactElement, { className: "w-4 h-4 text-foreground" })}
          <span className="text-xs font-medium truncate text-foreground">{instance.title}</span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-11 rounded-none hover:bg-white/10 dark:hover:bg-white/5 text-foreground" onClick={(e) => { e.stopPropagation(); minimizeWindow(instance.id); }} aria-label="Minimize">
            <Minus size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-11 rounded-none hover:bg-white/10 dark:hover:bg-white/5 text-foreground" onClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(instance.id); }} aria-label={instance.isMaximized ? "Restore" : "Maximize"}>
            {instance.isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-11 rounded-none hover:bg-destructive hover:text-destructive-foreground text-foreground" onClick={(e) => { e.stopPropagation(); closeWindow(instance.id); }} aria-label="Close">
            <X size={16} />
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-auto relative bg-background p-[15px]"> 
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

