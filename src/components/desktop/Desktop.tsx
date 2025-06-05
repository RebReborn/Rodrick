"use client";

import React from 'react';
import Taskbar from './Taskbar';
import WindowComponent from '../windows/Window';
import DesktopIcon from './DesktopIcon';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { appRegistry } from '@/config/appRegistry';
import Image from 'next/image';

const Desktop: React.FC = () => {
  const { windows } = useWindowManager();

  const desktopApps = appRegistry.filter(app => 
    ['projects', 'about', 'resume', 'futureProjects'].includes(app.key)
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none">
      {/* Desktop Background */}
      <Image 
        src="/desktop-wallpaper.jpg" // Replace with your desired wallpaper
        alt="Desktop Wallpaper"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority
        className="z-0"
        data-ai-hint="windows landscape"
      />
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30 z-0"></div>


      {/* Desktop Icons */}
      <div className="absolute top-0 left-0 p-4 z-10 flex flex-col flex-wrap h-full content-start gap-1">
        {desktopApps.map((app, index) => (
          <DesktopIcon 
            key={app.key} 
            app={app}
            // Basic grid positioning, can be made draggable/savable later
            // style={{ top: `${(index % 5) * 100 + 16}px`, left: `${Math.floor(index/5) * 110 + 16}px`}}
          />
        ))}
      </div>
      
      {/* Render Windows */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {windows.map((instance) => (
          <div key={instance.id} className="pointer-events-auto"> {/* This div captures pointer events for the window */}
            <WindowComponent instance={instance} />
          </div>
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

export default Desktop;
