
"use client";

import React, { useState, useEffect } from 'react';
import { LayoutGrid, User, Mail, FileText, Camera, Settings, Power, SunMoon } from 'lucide-react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import StartMenu from './StartMenu';
import { appRegistry } from '@/config/appRegistry';
import type { WindowInstance } from '@/types';
import { cn } from '@/lib/utils';

const WindowsStartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 11H3V3H11V11ZM11 21H3V13H11V21ZM21 11H13V3H21V11ZM21 21H13V13H21V21Z"/>
  </svg>
);


const Taskbar: React.FC = () => {
  const { openWindow, windows, focusWindow } = useWindowManager();
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })); // Numeric hour for 9:30 AM format
      setCurrentDate(now.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })); // Standard date format
    };
    updateDateTime(); // Initial call
    const timer = setInterval(updateDateTime, 1000 * 30); // Update every 30 seconds
    return () => clearInterval(timer);
  }, []);

  const pinnedApps = appRegistry.filter(app => ['projects', 'about', 'photography', 'contact', 'resume'].includes(app.key)); // User CSS implies contact & resume might be pinned

  const handleAppIconClick = (appKey: string) => {
    const openAppWindow = windows.find(w => w.appKey === appKey && !w.isMinimized);
    if (openAppWindow) {
      focusWindow(openAppWindow.id);
    } else {
      // If minimized, restore and focus
      const minimizedWindow = windows.find(w => w.appKey === appKey && w.isMinimized);
      if (minimizedWindow) {
        focusWindow(minimizedWindow.id); // focusWindow handles un-minimizing
      } else {
        openWindow(appKey);
      }
    }
    setIsStartMenuOpen(false); // Close start menu if an app is opened from taskbar
  };
  
  const getWindowForAppKey = (appKey: string): WindowInstance | undefined => {
    return windows.find(w => w.appKey === appKey);
  };

  const taskbarButtonHeightClass = "h-11"; // Corresponds to 44px, derived from h-[48px] - p-1 for button
  const taskbarIconSize = "w-11"; // Match height for square icons

  return (
    <>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      {/* User CSS: height: 48px; justify-content: center; background-color: rgba(32, 32, 32, 0.8); backdrop-filter: blur(10px) -> backdrop-blur-xl */}
      <footer className={cn(
        "fixed bottom-0 left-0 right-0 h-[48px]",
        "dark:bg-neutral-800/80 bg-neutral-200/80", // rgba(32,32,32,0.8) for dark, light equivalent
        "acrylic-blur dark:acrylic-dark", // Use existing acrylic setup which maps to backdrop-blur-xl
        "border-t border-black/20 dark:border-white/10", // Subtle border
        "shadow-md flex items-center justify-center px-2 z-50 select-none" // Centered content
      )}>
        <div className="flex items-center gap-1"> {/* This div will contain the centered icons */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(taskbarButtonHeightClass, taskbarIconSize, "hover:bg-white/10 dark:hover:bg-white/5", isStartMenuOpen && "bg-white/20 dark:bg-white/10")}
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            aria-label="Start Menu"
          >
            <WindowsStartIcon />
          </Button>
          {pinnedApps.map((app) => {
            const windowInstance = getWindowForAppKey(app.key);
            const isActive = windowInstance && !windowInstance.isMinimized && windowInstance.isActive;
            const isOpenAndNotMinimized = windowInstance && !windowInstance.isMinimized;
            
            return (
              <Button
                key={app.key}
                variant="ghost"
                size="icon"
                className={cn(
                  taskbarButtonHeightClass, taskbarIconSize, "relative hover:bg-white/10 dark:hover:bg-white/5",
                  isActive && "bg-white/20 dark:bg-white/10",
                )}
                onClick={() => handleAppIconClick(app.key)}
                title={app.name}
              >
                {React.cloneElement(app.icon as React.ReactElement, {size: 20})}
                {isOpenAndNotMinimized && (
                   <span className={cn(
                     "absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full", // Adjusted underline position for 48px bar
                     isActive ? "bg-primary" : "bg-foreground/60 dark:bg-foreground/40"
                   )}></span>
                )}
              </Button>
            );
          })}
           {windows.filter(w => !pinnedApps.some(pa => pa.key === w.appKey) && !w.isMinimized).map((windowInstance) => {
             const appDef = appRegistry.find(app => app.key === windowInstance.appKey);
             if (!appDef) return null;
             const isActive = !windowInstance.isMinimized && windowInstance.isActive;
             const isOpenAndNotMinimized = !windowInstance.isMinimized;

             return (
              <Button
                key={windowInstance.id}
                variant="ghost"
                size="icon"
                className={cn(
                  taskbarButtonHeightClass, taskbarIconSize, "relative hover:bg-white/10 dark:hover:bg-white/5",
                  isActive && "bg-white/20 dark:bg-white/10",
                )}
                onClick={() => focusWindow(windowInstance.id)}
                title={appDef.name}
              >
                {React.cloneElement(appDef.icon as React.ReactElement, {size: 20})}
                {isOpenAndNotMinimized && (
                   <span className={cn(
                     "absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full",
                     isActive ? "bg-primary" : "bg-foreground/60 dark:bg-foreground/40"
                   )}></span>
                )}
              </Button>
             )
           })}
        </div>

        {/* System Tray items - absolutely positioned to the right */}
        <div className="absolute right-2 flex items-center gap-2">
          <ThemeToggle />
          <div className="text-right text-xs px-2 text-foreground">
            <div>{currentTime}</div>
            <div>{currentDate}</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Taskbar;
