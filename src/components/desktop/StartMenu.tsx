
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Power, Settings, User, Mail, FileText, Camera, Folder, Music2, Users, Github, Linkedin } from 'lucide-react'; // Added Folder, Music2, Users
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { appRegistry } from '@/config/appRegistry';
import type { AppDefinition } from '@/types';
import { cn } from '@/lib/utils';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
  const { openWindow } = useWindowManager();
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const taskbarButton = document.querySelector('[aria-label="Start Menu"]');
        if (taskbarButton && taskbarButton.contains(event.target as Node)) {
          return; 
        }
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setSearchTerm(''); // Clear search on open
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Pinned apps as defined in user's CSS structure
  const pinnedAppsConfig = [
    { key: 'projects', name: 'Projects', icon: <Folder /> },
    { key: 'about', name: 'About Me', icon: <User /> },
    { key: 'photography', name: 'Photography', icon: <Camera /> },
    { key: 'resume', name: 'Resume', icon: <FileText /> },
    { key: 'contact', name: 'Contact', icon: <Mail /> }, // Added Contact based on common patterns
    { type: 'external', name: 'GitHub', icon: <Github />, url: 'https://github.com/Rebreborn' },
    { type: 'external', name: 'LinkedIn', icon: <Linkedin />, url: 'https://linkedin.com/in/rodrickramadhani' },
  ];

  // Recommended apps (example based on user CSS for dTunes etc.)
  const recommendedAppsConfig = [
    { key: 'projects', subTarget: 'dtunes-music-platform', name: 'dTunes', icon: <Music2 /> },
    { key: 'projects', subTarget: 'dzaleka-online-community', name: 'Dzaleka Online', icon: <Users /> },
    { key: 'projects', subTarget: 'reborn-pixels-portfolio', name: 'Reborn Pixels', icon: <Camera /> }, // Note: Reborn Pixels might be the photography app itself
  ];


  const allAppsForSearch = appRegistry;

  const displayedApps = searchTerm
    ? allAppsForSearch.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : pinnedAppsConfig; // Show pinned apps by default if no search

  const handleAppClick = (appKey: string, type?: string, url?: string, subTarget?: string) => {
    if (type === 'external' && url) {
      window.open(url, '_blank');
    } else if (appKey === 'projects' && subTarget) {
      // This logic needs to be fleshed out - how to open a specific project?
      // For now, just open the Projects app. Detail view is inside.
      openWindow(appKey, {isFocusedOnMount: true});
      console.log(`Would navigate to project: ${subTarget}`);
    } else {
      const appDef = appRegistry.find(app => app.key === appKey);
      if (appDef) {
        openWindow(appKey);
      }
    }
    onClose();
  };

  // User CSS: fixed bottom: 60px; left: 50%; transform: translateX(-50%); width: 600px; height: 650px;
  // background-color: rgba(32, 32, 32, 0.9); backdrop-filter: blur(20px);
  // Animation: transform: scale(0.9) -> scale(1), opacity: 0 -> 1
  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed bottom-[60px] left-1/2 w-[600px] h-[650px]",
        "dark:bg-neutral-800/90 bg-neutral-300/90", // rgba(32,32,32,0.9) for dark
        "acrylic-blur dark:acrylic-dark", // backdrop-blur-xl (20px)
        "rounded-lg shadow-window border border-black/10 dark:border-white/10",
        "z-40 flex flex-col overflow-hidden",
        isOpen ? "animate-start-menu-open opacity-100 transform -translate-x-1/2 scale-100" : "opacity-0 -translate-x-1/2 scale-90 pointer-events-none"
      )}
      style={{transition: 'opacity 0.2s ease, transform 0.2s ease'}} // CSS transition from user
    >
      <div className="p-[15px] bg-white/5 dark:bg-black/5"> {/* Search bar background */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            type="search"
            placeholder="Type here to search"
            // User CSS: padding: 8px 15px; border-radius: 20px; background-color: rgba(255,255,255,0.1)
            className="w-full pl-10 pr-[15px] py-2 h-auto rounded-full bg-white/10 dark:bg-black/20 text-foreground placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-primary border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* User CSS: .start-content { display: flex; flex: 1; } .pinned-apps { flex: 3; } .recommended { flex: 2; } */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-[3] p-[15px] overflow-y-auto"> {/* Pinned Apps */}
          <h3 className="text-sm font-semibold text-foreground/70 mb-[15px]">{searchTerm ? "Search Results" : "Pinned"}</h3>
          {/* User CSS: grid-template-columns: repeat(3, 1fr); gap: 15px; */}
          <div className="grid grid-cols-3 gap-[15px]">
            {displayedApps.map((app) => (
              <Button
                key={(app as any).type === 'external' ? (app as any).url : (app as AppDefinition).key}
                variant="ghost"
                // User CSS: padding: 10px; icon font-size: 24px; text font-size: 12px
                className="flex flex-col items-center justify-center h-auto p-[10px] text-center hover:bg-white/10 dark:hover:bg-black/20 rounded-md"
                onClick={() => handleAppClick((app as AppDefinition).key, (app as any).type, (app as any).url)}
              >
                <span className="mb-2 text-primary"> {/* mb-2 for 8px */}
                  {React.cloneElement(app.icon as React.ReactElement, { size: 24 })}
                </span>
                <span className="text-xs leading-tight text-foreground">{app.name}</span>
              </Button>
            ))}
            {searchTerm && displayedApps.length === 0 && (
              <p className="col-span-full text-center text-sm text-muted-foreground py-4">No results found.</p>
            )}
          </div>
        </div>

        {!searchTerm && (
          <div className="flex-[2] p-[15px] bg-white/5 dark:bg-black/5 overflow-y-auto"> {/* Recommended */}
            <h3 className="text-sm font-semibold text-foreground/70 mb-[15px]">Recommended</h3>
            <div className="grid grid-cols-3 gap-[15px]"> {/* User CSS has app-grid with 3 cols for recommended */}
              {recommendedAppsConfig.map((recApp) => (
                <Button
                  key={recApp.subTarget || recApp.key}
                  variant="ghost"
                  className="flex flex-col items-center justify-center h-auto p-[10px] text-center hover:bg-white/10 dark:hover:bg-black/20 rounded-md"
                  onClick={() => handleAppClick(recApp.key, undefined, undefined, recApp.subTarget)}
                >
                  <span className="mb-2 text-primary">
                     {React.cloneElement(recApp.icon as React.ReactElement, { size: 24 })}
                  </span>
                  <span className="text-xs leading-tight text-foreground">{recApp.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>


      <div className="p-4 mt-auto border-t border-black/10 dark:border-white/10 flex justify-between items-center bg-muted/10 dark:bg-black/10">
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-white/10 dark:hover:bg-black/20 p-1.5 rounded">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">User Name</span>
        </Button>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/10 dark:hover:bg-black/20" title="Settings (Coming Soon)">
            <Settings size={18} className="text-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-white/10 dark:hover:bg-black/20" title="Power (Coming Soon)">
            <Power size={18} className="text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
