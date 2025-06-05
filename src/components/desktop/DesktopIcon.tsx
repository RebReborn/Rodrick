
"use client";

import React from 'react';
import type { AppDefinition } from '@/types';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
  app: AppDefinition;
  style?: React.CSSProperties; // Keep style prop for potential future use
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

  // User CSS: .desktop-icon { width: 100px (implicitly by grid); height: 120px (implicitly by grid); padding: 10px; }
  // Icon: font-size: 36px; margin-bottom: 8px;
  // Span: font-size: 12px; text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  return (
    <div
      className="flex flex-col items-center justify-start w-[100px] h-[120px] p-2.5 text-center select-none rounded-md hover:bg-white/10 dark:hover:bg-white/5 focus:bg-white/20 dark:focus:bg-white/10 outline-none focus:ring-1 focus:ring-white/50"
      onDoubleClick={handleDoubleClick}
      tabIndex={0} 
      style={style} // Apply passed style
      title={`Open ${app.name}`}
    >
      <div className="mb-2 text-white drop-shadow-md"> {/* mb-2 for 8px margin */}
        {React.cloneElement(app.icon as React.ReactElement, { size: 36 })}
      </div>
      <span 
        className="text-xs text-white" 
        style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}} // Specific text shadow from user CSS
      >
        {app.name}
      </span>
    </div>
  );
};

export default DesktopIcon;
