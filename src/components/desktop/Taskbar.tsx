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
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pinnedApps = appRegistry.filter(app => ['projects', 'about', 'contact', 'resume', 'photography', 'futureProjects'].includes(app.key));

  const handleAppIconClick = (appKey: string) => {
    const openAppWindow = windows.find(w => w.appKey === appKey && !w.isMinimized);
    if (openAppWindow) {
      focusWindow(openAppWindow.id);
    } else {
      openWindow(appKey);
    }
  };
  
  const getWindowForAppKey = (appKey: string): WindowInstance | undefined => {
    return windows.find(w => w.appKey === appKey);
  };

  return (
    <>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      <footer className="fixed bottom-0 left-0 right-0 h-[42px] bg-card/80 dark:bg-card/80 acrylic-blur acrylic-light dark:acrylic-dark border-t border-border/50 shadow-md flex items-center justify-between px-2 z-50 select-none">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-9 w-9 hover:bg-accent/20", isStartMenuOpen && "bg-accent/30")}
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            aria-label="Start Menu"
          >
            <WindowsStartIcon />
          </Button>
          {pinnedApps.map((app) => {
            const windowInstance = getWindowForAppKey(app.key);
            const isActive = windowInstance && !windowInstance.isMinimized && windowInstance.isActive;
            const isOpen = windowInstance && !windowInstance.isMinimized;
            
            return (
              <Button
                key={app.key}
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 relative hover:bg-accent/20",
                  isActive && "bg-accent/30",
                )}
                onClick={() => handleAppIconClick(app.key)}
                title={app.name}
              >
                {app.icon}
                {isOpen && (
                   <span className={cn(
                     "absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full",
                     isActive ? "bg-primary" : "bg-foreground/50"
                   )}></span>
                )}
              </Button>
            );
          })}
           {windows.filter(w => !pinnedApps.some(pa => pa.key === w.appKey) && !w.isMinimized).map((windowInstance) => {
             const appDef = appRegistry.find(app => app.key === windowInstance.appKey);
             if (!appDef) return null;
             const isActive = !windowInstance.isMinimized && windowInstance.isActive;
             const isOpen = !windowInstance.isMinimized;

             return (
              <Button
                key={windowInstance.id}
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 relative hover:bg-accent/20",
                  isActive && "bg-accent/30",
                )}
                onClick={() => focusWindow(windowInstance.id)}
                title={appDef.name}
              >
                {appDef.icon}
                {isOpen && (
                   <span className={cn(
                     "absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full",
                     isActive ? "bg-primary" : "bg-foreground/50"
                   )}></span>
                )}
              </Button>
             )
           })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="text-right text-xs px-2">
            <div>{currentTime}</div>
            <div>{currentDate}</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Taskbar;
