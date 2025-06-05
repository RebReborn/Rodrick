
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
  
  const handleMouseDownOnTitleBar = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check if the click target is one of the control buttons
    const targetElement = e.target as HTMLElement;
    if (targetElement.closest('button[aria-label]')) { // Assumes control buttons have aria-labels
        return; // Do not initiate drag if a control button was clicked
    }

    if (instance.isMaximized && e.detail === 2) { // Double click to unmaximize
      toggleMaximizeWindow(instance.id);
      // Optionally, position the window under the cursor after unmaximizing
      // This is complex and involves calculating new X/Y based on cursor and original size.
      // For now, it will revert to its last non-maximized position.
      return;
    }
    if (instance.isMaximized) return; // Don't drag if maximized (single click)


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
    setResizeDirection(direction);
    bringToFront(instance.id);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (instance.isDragging && initialDragPos && initialWindowPos) {
      const dx = e.clientX - initialDragPos.x;
      const dy = e.clientY - initialDragPos.y;
      
      // Prevent dragging outside viewport, considering taskbar height (48px)
      const newX = Math.max(0, Math.min(initialWindowPos.x + dx, window.innerWidth - instance.width));
      const newY = Math.max(0, Math.min(initialWindowPos.y + dy, window.innerHeight - 48 - 32)); // 32 for title bar
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
            const proposedWidth = initialWindowSize.width - dx;
            if (proposedWidth >= minWidth) {
                newWidth = proposedWidth;
                newX = initialWindowPos ? initialWindowPos.x + dx : instance.x + dx; // Use initialWindowPos if available
            } else {
                newWidth = minWidth;
                newX = initialWindowPos ? initialWindowPos.x + (initialWindowSize.width - minWidth) : instance.x + (initialWindowSize.width - minWidth);
            }
        }
        if (resizeDirection.includes("top")) {
            const proposedHeight = initialWindowSize.height - dy;
            if (proposedHeight >= minHeight) {
                newHeight = proposedHeight;
                newY = initialWindowPos ? initialWindowPos.y + dy : instance.y + dy;
            } else {
                newHeight = minHeight;
                newY = initialWindowPos ? initialWindowPos.y + (initialWindowSize.height - minHeight) : instance.y + (initialWindowSize.height - minHeight);
            }
        }
        
        updateWindowSize(instance.id, newWidth, newHeight);
        if (newX !== instance.x || newY !== instance.y) {
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
    width: '100vw', // Maximized fills screen width
    height: 'calc(100vh - 48px)', // Account for 48px taskbar
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
    // User CSS: transition: none during drag/resize, else opacity/transform 0.2s
    transition: instance.isDragging || instance.isResizing ? 'none' : 'opacity 0.2s ease-out, transform 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out, top 0.2s ease-out, left 0.2s ease-out',
  };

  const resizeHandleClasses = "absolute bg-transparent z-10";
  const resizeHandles = [
    // Corners (larger hit area)
    { direction: "top-left", className: "cursor-nwse-resize top-0 left-0 w-3 h-3 -m-1" },
    { direction: "top-right", className: "cursor-nesw-resize top-0 right-0 w-3 h-3 -m-1" },
    { direction: "bottom-left", className: "cursor-nesw-resize bottom-0 left-0 w-3 h-3 -m-1" },
    { direction: "bottom-right", className: "cursor-nwse-resize bottom-0 right-0 w-3 h-3 -m-1" },
    // Edges (thinner hit area but covers full edge)
    { direction: "top", className: "cursor-ns-resize top-0 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] h-2 -my-1" },
    { direction: "left", className: "cursor-ew-resize top-1/2 -translate-y-1/2 left-0 w-2 h-[calc(100%-16px)] -mx-1" },
    { direction: "right", className: "cursor-ew-resize top-1/2 -translate-y-1/2 right-0 w-2 h-[calc(100%-16px)] -mx-1" },
    { direction: "bottom", className: "cursor-ns-resize bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] h-2 -my-1" },
  ];
  
  // User CSS: background-color: rgba(32, 32, 32, 0.9); backdrop-filter: blur(20px); border-radius: 8px; box-shadow: var(--shadow)
  // For dark theme, this translates to dark:bg-neutral-800/90, acrylic-blur dark:acrylic-dark, rounded-lg, shadow-window
  // Header User CSS: background-color: rgba(255, 255, 255, 0.05);
  // This translates to bg-white/5 (or black/5 in dark mode if title bar is always darkish)
  return (
    <div
      ref={windowRef}
      style={windowStyle}
      className={cn(
        'flex flex-col rounded-lg shadow-window overflow-hidden border',
        'dark:bg-neutral-800/90 bg-neutral-100/90', // Base window color
        'acrylic-blur acrylic-light dark:acrylic-dark', // Applies backdrop blur and slight tint
        isAppActive ? 'border-primary ring-1 ring-primary' : 'border-black/10 dark:border-white/10',
        instance.isMaximized ? '!rounded-none' : '', // Important to override rounded-lg
        'animate-window-open' // Always apply open animation as component presence means it's open
      )}
      onClick={() => {if (!isAppActive) bringToFront(instance.id)}}
      onMouseDownCapture={() => {if (!isAppActive) bringToFront(instance.id)}} // Use onMouseDownCapture for earlier focus
    >
      <div
        ref={titleBarRef}
        onMouseDown={handleMouseDownOnTitleBar}
        onDoubleClick={() => toggleMaximizeWindow(instance.id)}
        className={cn(
          'h-8 px-2 flex items-center justify-between select-none shrink-0',
          'bg-white/5 dark:bg-black/10', // Title bar color from user CSS (rgba(255,255,255,0.05))
          // Removed acrylic from title bar for a flatter look as per some Win11 styles, can be re-added if preferred
          instance.isMaximized ? '' : 'cursor-grab',
          isAppActive ? 'opacity-100' : 'opacity-90' // Subtle active state for title bar
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
      <div className="flex-grow overflow-auto relative bg-background p-[15px]"> {/* User CSS: padding: 15px */}
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

