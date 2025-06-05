
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
    ['projects', 'about', 'resume', 'photography', 'contact', 'terminal', 'futureProjects', 'chromeBrowser'].includes(app.key)
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none">
      {/* Desktop Background */}
      <Image 
        src="https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-stock-official-3840x2400-5630.jpg" // Updated wallpaper
        alt="Desktop Wallpaper"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority
        className="z-0"
        // data-ai-hint="windows landscape" // data-ai-hint is not needed for specific URLs
      />
      {/* Overlay for style, if needed, but wallpaper might be enough. Original had bg-black/10 dark:bg-black/30 */}
      {/* <div className="absolute inset-0 bg-black/5 dark:bg-black/20 z-0"></div> */}


      {/* Desktop Icons */}
      {/* Switched to grid layout as per user CSS: grid-template-columns: repeat(auto-fill, 100px); grid-auto-rows: 120px; gap: 20px; */}
      <div className="absolute top-0 left-0 right-0 p-5 z-10 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] auto-rows-[120px] gap-5 content-start h-[calc(100vh-48px)] overflow-y-auto">
        {desktopApps.map((app) => (
          <DesktopIcon 
            key={app.key} 
            app={app}
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

