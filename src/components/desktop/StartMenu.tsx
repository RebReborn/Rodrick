
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Power, Settings, User, Mail, FileText, Camera, Folder, Music2, Users, Github, Linkedin } from 'lucide-react';
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
    { key: 'contact', name: 'Contact', icon: <Mail /> }, 
    { type: 'external', name: 'GitHub', icon: <Github />, url: 'https://github.com/Rebreborn' },
    { type: 'external', name: 'LinkedIn', icon: <Linkedin />, url: 'https://linkedin.com/in/rodrickramadhani' },
  ];

  // Recommended apps (example based on user CSS for dTunes etc.)
  const recommendedAppsConfig = [
    { key: 'projects', subTarget: 'dtunes-music-platform', name: 'dTunes', icon: <Music2 /> },
    { key: 'projects', subTarget: 'dzaleka-online-community', name: 'Dzaleka Online', icon: <Users /> },
    { key: 'projects', subTarget: 'reborn-pixels-portfolio', name: 'Reborn Pixels', icon: <Camera /> },
  ];


  const allAppsForSearch = appRegistry;

  const displayedApps = searchTerm
    ? allAppsForSearch.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : pinnedAppsConfig; 

  const handleAppClick = (appKey: string, type?: string, url?: string, subTarget?: string) => {
    if (type === 'external' && url) {
      window.open(url, '_blank');
    } else if (appKey === 'projects' && subTarget) {
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

  const handleSettingsClick = () => {
    openWindow('settingsApp'); // 'settingsApp' is the key from appRegistry
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed bottom-[60px] left-1/2 w-[600px] h-[650px]",
        "dark:bg-neutral-800/90 bg-neutral-300/90", 
        "acrylic-blur dark:acrylic-dark", 
        "rounded-lg shadow-window border border-black/10 dark:border-white/10",
        "z-40 flex flex-col overflow-hidden",
        isOpen ? "animate-start-menu-open opacity-100 transform -translate-x-1/2 scale-100" : "opacity-0 -translate-x-1/2 scale-90 pointer-events-none"
      )}
      style={{transition: 'opacity 0.2s ease, transform 0.2s ease'}} 
    >
      <div className="p-[15px] bg-white/5 dark:bg-black/5"> 
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <Input
            type="search"
            placeholder="Type here to search"
            className="w-full pl-10 pr-[15px] py-2 h-auto rounded-full bg-white/10 dark:bg-black/20 text-foreground placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-primary border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search apps and settings"
          />
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <ScrollArea className="flex-[3] p-[15px]"> {/* Pinned Apps with ScrollArea */}
          <h3 className="text-sm font-semibold text-foreground/70 mb-[15px]">{searchTerm ? "Search Results" : "Pinned"}</h3>
          <div className="grid grid-cols-3 gap-[15px]">
            {displayedApps.map((app) => (
              <Button
                key={(app as any).type === 'external' ? (app as any).url : (app as AppDefinition).key}
                variant="ghost"
                className="flex flex-col items-center justify-center h-auto p-[10px] text-center hover:bg-white/10 dark:hover:bg-black/20 rounded-md min-h-[80px]" // Ensure min height for consistency
                onClick={() => handleAppClick((app as AppDefinition).key, (app as any).type, (app as any).url)}
                title={app.name}
              >
                <span className="mb-2 text-primary"> 
                  {React.cloneElement(app.icon as React.ReactElement, { size: 24 })}
                </span>
                <span className="text-xs leading-tight text-foreground line-clamp-2">{app.name}</span>
              </Button>
            ))}
            {searchTerm && displayedApps.length === 0 && (
              <p className="col-span-full text-center text-sm text-muted-foreground py-4">No results found.</p>
            )}
          </div>
        </ScrollArea>

        {!searchTerm && (
          <ScrollArea className="flex-[2] p-[15px] bg-white/5 dark:bg-black/5"> {/* Recommended with ScrollArea */}
            <h3 className="text-sm font-semibold text-foreground/70 mb-[15px]">Recommended</h3>
            <div className="grid grid-cols-3 gap-[15px]"> 
              {recommendedAppsConfig.map((recApp) => (
                <Button
                  key={recApp.subTarget || recApp.key}
                  variant="ghost"
                  className="flex flex-col items-center justify-center h-auto p-[10px] text-center hover:bg-white/10 dark:hover:bg-black/20 rounded-md min-h-[80px]" // Ensure min height
                  onClick={() => handleAppClick(recApp.key, undefined, undefined, recApp.subTarget)}
                  title={recApp.name}
                >
                  <span className="mb-2 text-primary">
                     {React.cloneElement(recApp.icon as React.ReactElement, { size: 24 })}
                  </span>
                  <span className="text-xs leading-tight text-foreground line-clamp-2">{recApp.name}</span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>


      <div className="p-4 mt-auto border-t border-black/10 dark:border-white/10 flex justify-between items-center bg-muted/10 dark:bg-black/10">
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-white/10 dark:hover:bg-black/20 p-1.5 rounded">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/40x40.png" alt="Rodrick Reborn" data-ai-hint="person avatar" />
            <AvatarFallback>RR</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">Rodrick Reborn</span>
        </Button>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 hover:bg-white/10 dark:hover:bg-black/20" 
            title="Settings"
            onClick={handleSettingsClick}
            aria-label="Open Settings"
          >
            <Settings size={18} className="text-foreground" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 hover:bg-white/10 dark:hover:bg-black/20" 
            title="Power (Conceptual)"
            aria-label="Power Options"
          >
            <Power size={18} className="text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
