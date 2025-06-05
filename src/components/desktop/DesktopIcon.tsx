"use client";

import React from 'react';
import type { AppDefinition } from '@/types';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
  app: AppDefinition;
  style?: React.CSSProperties;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ app, style }) => {
  const { openWindow, windows, focusWindow } = useWindowManager();

  const handleDoubleClick = () => {
    const openAppWindow = windows.find(w => w.appKey === app.key && !w.isMinimized);
    if (openAppWindow) {
      focusWindow(openAppWindow.id);
    } else {
      openWindow(app.key);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-24 h-24 p-2 text-center select-none rounded hover:bg-white/10 dark:hover:bg-white/5 focus:bg-white/20 dark:focus:bg-white/10 outline-none focus:ring-1 focus:ring-white/50"
      onDoubleClick={handleDoubleClick}
      tabIndex={0} // Make it focusable
      style={style}
      title={`Open ${app.name}`}
    >
      <div className="mb-1 text-white drop-shadow-md">
        {React.cloneElement(app.icon as React.ReactElement, { size: 36 })}
      </div>
      <span className="text-xs text-white truncate drop-shadow-sm" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>{app.name}</span>
    </div>
  );
};

export default DesktopIcon;
