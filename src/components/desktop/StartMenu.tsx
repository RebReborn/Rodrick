"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Power, Settings, LayoutGrid, User, Mail, FileText, Camera, Zap, Code, Database, Shield, Brush, Package } from 'lucide-react';
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
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  const pinnedApps = appRegistry.filter(app => ['projects', 'about', 'contact', 'resume', 'photography', 'futureProjects'].includes(app.key));
  const allAppsForSearch = appRegistry; // Could expand this with more items

  const filteredApps = searchTerm
    ? allAppsForSearch.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : pinnedApps; // Show pinned apps by default if no search

  const handleAppClick = (appKey: string) => {
    openWindow(appKey);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed bottom-[44px] left-2 w-[500px] h-[600px] bg-card/90 dark:bg-card/90 acrylic-blur acrylic-light dark:acrylic-dark backdrop-blur-xl rounded-lg shadow-2xl border border-border/50 z-40 flex flex-col overflow-hidden animate-window-open"
      style={{ animationDuration: '0.15s' }}
    >
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Type here to search"
            className="pl-10 h-10 bg-background/70 dark:bg-background/70 focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4 pb-2">
        <h3 className="text-sm font-semibold text-foreground/80 mb-2">{searchTerm ? "Search Results" : "Pinned"}</h3>
      </div>
      
      <ScrollArea className="flex-grow px-4">
        <div className="grid grid-cols-5 gap-2">
          {filteredApps.map((app) => (
            <Button
              key={app.key}
              variant="ghost"
              className="flex flex-col items-center justify-center h-24 p-2 text-center hover:bg-accent/20"
              onClick={() => handleAppClick(app.key)}
            >
              <span className="mb-1 text-primary">{React.cloneElement(app.icon as React.ReactElement, { size: 28 })}</span>
              <span className="text-xs leading-tight">{app.name}</span>
            </Button>
          ))}
           {searchTerm && filteredApps.length === 0 && (
             <p className="col-span-5 text-center text-sm text-muted-foreground py-4">No results found.</p>
           )}
        </div>
      </ScrollArea>

      {/* Recommended Section (placeholder) */}
      {!searchTerm && (
        <>
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-sm font-semibold text-foreground/80 mb-2">Recommended</h3>
          </div>
          <ScrollArea className="h-32 px-4">
            <div className="space-y-1">
              {/* Example recommended items */}
              <Button variant="ghost" className="w-full justify-start h-10 text-sm hover:bg-accent/20">
                <LayoutGrid size={18} className="mr-3 text-primary" /> My Latest Project
              </Button>
              <Button variant="ghost" className="w-full justify-start h-10 text-sm hover:bg-accent/20">
                <FileText size={18} className="mr-3 text-primary" /> View Resume
              </Button>
            </div>
          </ScrollArea>
        </>
      )}

      <div className="p-4 mt-auto border-t border-border/50 flex justify-between items-center bg-muted/20 dark:bg-muted/10">
        <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent/20">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">User</span>
        </Button>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-accent/20" title="Settings (Coming Soon)">
            <Settings size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-accent/20" title="Power (Coming Soon)">
            <Power size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
