"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Photo } from '@/data/photography';
import { photographyData } from '@/data/photography';
import { Maximize } from 'lucide-react';
import { Button } from '../ui/button';

const PhotographyApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      <header className="p-4 border-b">
        <h1 className="text-xl font-semibold">My Photography</h1>
        <p className="text-sm text-muted-foreground">A collection of moments captured through my lens.</p>
      </header>
      <ScrollArea className="flex-grow p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {photographyData.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-md overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image 
                src={photo.src} 
                alt={photo.alt} 
                layout="fill" 
                objectFit="cover" 
                className="transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={photo.aiHint || "photo gallery image"}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize size={32} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={(isOpen) => !isOpen && setSelectedPhoto(null)}>
          <DialogContent className="max-w-3xl p-0 acrylic-blur acrylic-light dark:acrylic-dark !bg-card/90 dark:!bg-card/90">
            <div className="relative w-full aspect-[4/3] max-h-[70vh]">
               <Image 
                src={selectedPhoto.src} 
                alt={selectedPhoto.alt} 
                layout="fill" 
                objectFit="contain"
                data-ai-hint={selectedPhoto.aiHint || "photo gallery image"}
              />
            </div>
            {(selectedPhoto.title || selectedPhoto.description) && (
                <div className="p-4 border-t">
                    {selectedPhoto.title && <DialogTitle className="text-lg">{selectedPhoto.title}</DialogTitle>}
                    {selectedPhoto.description && <DialogDescription className="text-sm mt-1">{selectedPhoto.description}</DialogDescription>}
                </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PhotographyApp;
