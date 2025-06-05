
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Photo } from '@/data/photography';
import { photographyData } from '@/data/photography';
import { Maximize, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

const PhotographyApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const fullPortfolioUrl = "https://reborn-pixels-production.web.app/"; // From user CSS

  // User CSS: .project-screenshots, .screenshot img styling, .submit-btn for full portfolio
  return (
    <div className="h-full flex flex-col bg-transparent text-foreground"> {/* Window itself has padding now */}
      <header className="p-0 mb-4"> {/* Parent provides padding */}
        <h1 className="text-xl font-semibold">My Photography</h1>
        <p className="text-sm text-muted-foreground">A collection of moments captured through my lens.</p>
      </header>
      <ScrollArea className="flex-grow pr-1">
        {/* User CSS for tags: .flex .flex-wrap .gap-3 .mb-6, .bg-blue-100 etc. Using primary/accent for theme */}
        <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-primary/20 text-primary-foreground dark:text-primary text-sm px-3 py-1 rounded-full">Photography</span>
            <span className="bg-accent/20 text-accent-foreground dark:text-accent text-sm px-3 py-1 rounded-full">Creative</span>
            <span className="bg-primary/20 text-primary-foreground dark:text-primary text-sm px-3 py-1 rounded-full">Visual Storytelling</span>
        </div>

        {/* User CSS: .project-screenshots, grid, gap 15px */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] project-screenshots">
          {photographyData.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-md overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow screenshot"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image 
                src={photo.src} 
                alt={photo.alt} 
                layout="fill" 
                objectFit="cover" 
                className="transition-transform duration-300 group-hover:scale-110 opacity-0 group-hover:opacity-100 loaded:opacity-100"
                data-ai-hint={photo.aiHint || "photo gallery image"}
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
               <Image 
                src={photo.src} 
                alt={photo.alt} 
                layout="fill" 
                objectFit="cover" 
                className="transition-transform duration-300 group-hover:scale-110 opacity-100 group-hover:opacity-0" // Base image always visible
                data-ai-hint={photo.aiHint || "photo gallery image"}
                priority={photographyData.slice(0,4).includes(photo)} // Prioritize first few
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize size={32} className="text-white" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6 mb-2">
            <Button asChild className="submit-btn bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href={fullPortfolioUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" /> View Full Portfolio
                </a>
            </Button>
        </div>
      </ScrollArea>

      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={(isOpen) => !isOpen && setSelectedPhoto(null)}>
          <DialogContent className="max-w-3xl w-[90vw] md:w-full p-0 acrylic-blur acrylic-light dark:acrylic-dark !bg-card/95 dark:!bg-card/95 rounded-lg">
            <div className="relative w-full aspect-[4/3] max-h-[70vh]">
               <Image 
                src={selectedPhoto.src} 
                alt={selectedPhoto.alt} 
                layout="fill" 
                objectFit="contain"
                data-ai-hint={selectedPhoto.aiHint || "photo gallery image detail"}
              />
            </div>
            {(selectedPhoto.title || selectedPhoto.description) && (
                <div className="p-4 border-t border-border/20">
                    {selectedPhoto.title && <DialogTitle className="text-lg text-foreground">{selectedPhoto.title}</DialogTitle>}
                    {selectedPhoto.description && <DialogDescription className="text-sm mt-1 text-muted-foreground">{selectedPhoto.description}</DialogDescription>}
                </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PhotographyApp;
