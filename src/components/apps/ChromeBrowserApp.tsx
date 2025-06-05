
"use client";

import React from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Search, Plus, Settings, Star, Download, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const ChromeBrowserApp: React.FC<{ windowId: string; appKey: string }> = () => {

  const mockShortcuts = [
    { name: "Google", icon: <Search size={24} />, color: "bg-blue-500/20 text-blue-700 dark:text-blue-400" },
    { name: "YouTube", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M9.996,15.006V8.994l5.217,3.006L9.996,15.006z"></path></svg>, color: "bg-red-500/20 text-red-700 dark:text-red-400" },
    { name: "Gmail", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M19.6,8.25l-7.07,4.42 c-0.32,0.2-0.74,0.2-1.06,0L4.4,8.25C4.15,8.09,4,7.82,4,7.53c0-0.67,0.73-1.07,1.3-0.72L12,11l6.7-4.19 C19.27,6.46,20,6.86,20,7.53C20,7.82,19.85,8.09,19.6,8.25z"></path></svg>, color: "bg-red-500/20 text-red-600 dark:text-red-400" },
    { name: "Drive", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.26,9.18L12.73,2.3C12.54,2.1,12.28,2,12,2H6.48C6.1,2,5.74,2.19,5.55,2.55L2.19,8.61C2.07,8.81,2,9.04,2,9.28V18.5 C2,19.33,2.67,20,3.5,20h17c0.83,0,1.5-0.67,1.5-1.5V10.41C22,10.04,21.86,9.69,21.62,9.43L19.26,9.18z M9.19,12.5L6,17.5h12 l-3.19-5H9.19z M14.32,8.5L12,12.34L9.68,8.5H14.32z"></path></svg>, color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400" },
    { name: "Docs", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M13,9V3.5L18.5,9H13z M12,18H8v-2h4V18z M16,14H8v-2h8V14z"></path></svg>, color: "bg-blue-500/20 text-blue-700 dark:text-blue-400" },
    { name: "Sheets", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M13,9V3.5L18.5,9H13z M11,18H8v-2h3V18z M11,15H8v-2h3V15z M11,12H8V10h3V12z M15,18h-3v-2h3V18z M15,15h-3v-2h3V15z M15,12h-3V10h3V12z"></path></svg>, color: "bg-green-500/20 text-green-700 dark:text-green-400" },

  ];

  return (
    <div className="h-full flex flex-col bg-background text-foreground overflow-hidden">
      {/* Browser Toolbar */}
      <div className="h-12 bg-muted/60 dark:bg-muted/30 flex items-center px-2 gap-1 border-b border-border shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
          <ArrowLeft size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
          <ArrowRight size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
          <RefreshCw size={18} />
        </Button>
        <div className="relative flex-grow mx-2">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search Google or type a URL"
            className="h-8 w-full pl-9 pr-2 rounded-full bg-background/80 dark:bg-zinc-700/50 border-border focus-visible:ring-primary"
            defaultValue="https://google.com"
            readOnly
          />
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Extensions (Coming Soon)" disabled>
            <Star size={18} />
        </Button>
         <Button variant="ghost" size="icon" className="h-8 w-8" title="Downloads (Coming Soon)" disabled>
            <Download size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="History (Coming Soon)" disabled>
            <History size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Settings (Coming Soon)" disabled>
          <Settings size={18} />
        </Button>
      </div>

      {/* Browser Content Area - Mock New Tab Page */}
      <div className="flex-grow overflow-y-auto bg-background flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <svg className="mx-auto h-20 w-auto text-muted-foreground/50 mb-6" viewBox="0 0 91 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30.5826 15.0157C30.5826 23.3103 23.7358 30 15.2913 30C6.84682 30 0 23.3103 0 15.0157C0 6.72117 6.84682 0 15.2913 0C23.7358 0 30.5826 6.72117 30.5826 15.0157ZM15.2913 5.62341C10.032 5.62341 5.70831 9.91785 5.70831 15.0157C5.70831 20.1136 10.032 24.408 15.2913 24.408C20.5506 24.408 24.8743 20.1136 24.8743 15.0157C24.8743 9.91785 20.5506 5.62341 15.2913 5.62341Z" fill="currentColor"/>
              <path d="M49.0331 15.0157C49.0331 23.3103 42.1863 30 33.7418 30C25.2973 30 18.4505 23.3103 18.4505 15.0157C18.4505 6.72117 25.2973 0 33.7418 0C42.1863 0 49.0331 6.72117 49.0331 15.0157ZM33.7418 5.62341C28.4825 5.62341 24.1588 9.91785 24.1588 15.0157C24.1588 20.1136 28.4825 24.408 33.7418 24.408C38.9996 24.408 43.3248 20.1136 43.3248 15.0157C43.3248 9.91785 39.0011 5.62341 33.7418 5.62341Z" fill="currentColor"/>
              <path d="M63.7604 6.00751V29.243H58.1755V6.00751H63.7604Z" fill="currentColor"/>
              <path d="M85.5474 29.243C81.8972 29.243 79.0859 27.3813 77.7632 24.942L82.9262 22.7697C83.3692 23.6253 84.1812 24.408 85.5163 24.408C87.0981 24.408 88.1385 23.4471 88.1385 22.0883V21.7476C87.5489 22.2073 86.5789 22.6054 85.3006 22.6054C81.7418 22.6054 78.3818 20.5869 78.3818 15.2168C78.3818 9.84668 81.7418 5.62341 85.3006 5.62341C86.5789 5.62341 87.5489 6.02145 88.1385 6.48114V6.16395H90.981V14.8592C90.981 23.7525 87.8432 29.243 85.5474 29.243ZM85.5163 10.4585C83.9963 10.4585 82.6612 12.0079 82.6612 15.2168C82.6612 18.4256 83.9963 19.975 85.5163 19.975C87.0363 19.975 88.3714 18.4256 88.3714 15.2168C88.3714 12.0079 87.0363 10.4585 85.5163 10.4585Z" fill="currentColor"/>
          </svg>
          <div className="relative w-full max-w-lg mx-auto my-6">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Google or type a URL"
              className="w-full h-12 pl-12 pr-4 rounded-full shadow-md bg-muted/50 dark:bg-zinc-700/60 border-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
              readOnly
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-xl mx-auto">
            {mockShortcuts.map((shortcut) => (
              <Button
                key={shortcut.name}
                variant="ghost"
                className="flex flex-col items-center justify-center h-24 w-full p-2 space-y-1 hover:bg-muted/70 dark:hover:bg-zinc-700/80 rounded-lg"
                disabled
              >
                <div className={`p-3 rounded-full ${shortcut.color} mb-1`}>
                  {shortcut.icon}
                </div>
                <span className="text-xs text-foreground truncate">{shortcut.name}</span>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center h-24 w-full p-2 space-y-1 hover:bg-muted/70 dark:hover:bg-zinc-700/80 rounded-lg"
              disabled
            >
               <div className="p-3 rounded-full bg-muted/80 dark:bg-zinc-600/70 mb-1">
                <Plus size={24} className="text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Add shortcut</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChromeBrowserApp;

    