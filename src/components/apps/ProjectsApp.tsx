
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Info, Maximize } from 'lucide-react'; // Added Maximize
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import type { Project } from '@/types';
import { sampleProjects, futureAdventuresData, type FutureAdventureCategory } from '@/data/projects';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast'; // For future adventure notification
import { cn } from '@/lib/utils';

const ProjectCard: React.FC<{ project: Project; onOpenDetail: (project: Project) => void }> = ({ project, onOpenDetail }) => {
  const handleCardActivate = () => {
    onOpenDetail(project);
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full bg-card/90 dark:bg-card/80 acrylic-blur acrylic-light dark:acrylic-dark group cursor-pointer"
      onClick={handleCardActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent space from scrolling the page if the card itself isn't meant to scroll
          handleCardActivate();
        }
      }}
      role="button" // For accessibility
      tabIndex={0}   // For accessibility, makes the card focusable and interactive
      title={`View details for ${project.title}`}
    >
      <div className="relative w-full h-40">
        <Image
          src={project.imageUrl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={project.imageHint || "project image"}
        />
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Info size={32} className="text-white/70" />
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-base flex items-center gap-2">
          {project.icon && React.cloneElement(project.icon as React.ReactElement, { size: 20, className:"text-primary" })}
          {project.title}
        </CardTitle>
        <CardDescription className="text-xs h-10 overflow-hidden text-ellipsis">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="flex flex-wrap gap-1 mb-2">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="text-xs bg-primary/20 text-primary-foreground dark:text-primary px-[10px] py-[5px] rounded-[15px]">{tech}</span>
          ))}
          {project.technologies.length > 3 && <span className="text-xs bg-primary/20 text-primary-foreground dark:text-primary px-[10px] py-[5px] rounded-[15px]">+{project.technologies.length - 3} more</span>}
        </div>
      </CardContent>
    </Card>
  );
};

const FutureAdventureItem: React.FC<{ adventure: FutureAdventureCategory, onClick: (name: string) => void }> = ({ adventure, onClick }) => {
  return (
    <Button
      variant="ghost"
      className="flex flex-col items-center justify-center h-28 p-2 text-center opacity-70 hover:opacity-100 hover:bg-primary/20 dark:hover:bg-primary/10 w-full rounded-md transition-all duration-300 app-item future group"
      onClick={() => onClick(adventure.fullName)}
      title={adventure.fullName}
    >
      <span className="mb-2 text-primary">{React.cloneElement(adventure.icon as React.ReactElement, { size: 32 })}</span>
      <span className="text-xs leading-tight text-foreground">{adventure.name}</span>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
    </Button>
  );
};


const ProjectsApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const handleFutureAdventureClick = (adventureName: string) => {
    toast({
        title: "Future Adventure!",
        description: `Exploring ideas for: ${adventureName}`,
        variant: "default",
        className: "notification future"
    });
    console.log(`Clicked on Future Adventure: ${adventureName}`);
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      <header className="p-0 mb-4">
        <h1 className="text-xl font-semibold text-foreground">My Projects</h1>
        <p className="text-sm text-muted-foreground">Click on a project card to view details.</p>
      </header>
      <ScrollArea className="flex-grow pr-1"> {/* Main scroll area for project list and future adventures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {sampleProjects.map(project => (
            <ProjectCard key={project.id} project={project} onOpenDetail={setSelectedProject} />
          ))}
        </div>

        <Separator className="my-8 bg-border/50" />

        <div>
          <h3 className="text-lg font-semibold mb-1 text-foreground">Future Adventures</h3>
          <p className="text-sm text-muted-foreground mb-4">Areas I'm excited to explore next:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
            {futureAdventuresData.map(adventure => (
              <FutureAdventureItem key={adventure.id} adventure={adventure} onClick={handleFutureAdventureClick} />
            ))}
          </div>
        </div>
      </ScrollArea>

      {selectedProject && (
         <Dialog open={!!selectedProject} onOpenChange={(isOpen) => !isOpen && setSelectedProject(null)}>
          <DialogContent className="max-w-3xl w-[90vw] md:w-full acrylic-blur acrylic-light dark:acrylic-dark !bg-card/95 dark:!bg-card/95 p-0 rounded-lg">
            <ScrollArea className="max-h-[85vh]"> {/* Scroll area for dialog content */}
              <DialogHeader className="p-6 pb-4 border-b border-border/50 sticky top-0 z-10 bg-inherit">
                <DialogTitle className="text-2xl flex items-center gap-3 text-foreground">
                  {selectedProject.icon && React.cloneElement(selectedProject.icon as React.ReactElement, { size: 28, className: "text-primary"})}
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="pl-[calc(28px+0.75rem)] text-muted-foreground">{selectedProject.category}</DialogDescription>
              </DialogHeader>
              <div className="p-6">
                <div className="relative w-full h-56 md:h-72 rounded-md overflow-hidden mb-6 shadow-md">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={selectedProject.imageHint || "project image"}
                    loading="lazy" className="opacity-0 transition-opacity duration-300 loaded:opacity-100"
                    onLoad={(e) => e.currentTarget.classList.add('loaded')}
                  />
                </div>
                <div className="project-details text-foreground/90 text-sm leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: selectedProject.longDescription?.replace(/\n/g, '<br />') || selectedProject.description }} />

                <h3 className="font-semibold mb-2 text-foreground">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2 mb-6 tech-stack">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="text-xs bg-primary/20 text-primary-foreground dark:text-primary px-[10px] py-[5px] rounded-[15px] tech-item">{tech}</span>
                  ))}
                </div>

                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <>
                    <h3 className="font-semibold mb-3 text-foreground">Screenshots:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 project-screenshots">
                      {selectedProject.screenshots.map((ss, idx) => (
                        <div key={idx} className="rounded-md overflow-hidden border border-border/20 shadow-md screenshot">
                           <Image src={ss.url} alt={ss.caption || `Screenshot ${idx+1}`} width={600} height={400} objectFit="cover" data-ai-hint={ss.hint || "application screenshot"} loading="lazy" className="opacity-0 transition-opacity duration-300 loaded:opacity-100" onLoad={(e) => e.currentTarget.classList.add('loaded')} />
                           {ss.caption && <p className="text-xs text-center p-1.5 bg-muted/50 text-muted-foreground">{ss.caption}</p>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <DialogFooter className="p-6 pt-4 border-t border-border/50 sticky bottom-0 z-10 bg-inherit acrylic-blur acrylic-light dark:acrylic-dark">
                <div className="flex gap-3 w-full justify-center project-links">
                  {selectedProject.liveDemoUrl && selectedProject.liveDemoUrl !== '#' && (
                    <Button asChild className="submit-btn demo-btn flex-1 max-w-xs">
                      <a href={selectedProject.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" /> Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <Button asChild variant="outline" className="submit-btn flex-1 max-w-xs border-primary text-primary hover:bg-primary/10">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" /> View Code
                      </a>
                    </Button>
                  )}
                </div>
                 <Button onClick={() => setSelectedProject(null)} variant="ghost" className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">Close</Button>
              </DialogFooter>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectsApp;

