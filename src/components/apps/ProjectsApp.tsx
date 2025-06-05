"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Info } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import type { Project } from '@/types';
import { sampleProjects } from '@/data/projects'; // Using sample data

const ProjectCard: React.FC<{ project: Project; onOpenDetail: (project: Project) => void }> = ({ project, onOpenDetail }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full bg-card/80 dark:bg-card/80 acrylic-blur acrylic-light dark:acrylic-dark">
      <div className="relative w-full h-40">
        <Image 
          src={project.imageUrl} 
          alt={project.title} 
          layout="fill" 
          objectFit="cover" 
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={project.imageHint || "project image"}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {project.icon && <span className="text-primary">{React.cloneElement(project.icon as React.ReactElement, { size: 20 })}</span>}
          {project.title}
        </CardTitle>
        <CardDescription className="text-xs h-10 overflow-hidden text-ellipsis">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{tech}</span>
          ))}
          {project.technologies.length > 3 && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">+{project.technologies.length - 3} more</span>}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onOpenDetail(project)} className="w-full" variant="outline">
          <Info size={16} className="mr-2" /> View Details
        </Button>
      </CardFooter>
    </Card>
  );
};


const ProjectsApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="h-full flex flex-col bg-background">
      <header className="p-4 border-b">
        <h1 className="text-xl font-semibold">My Projects</h1>
      </header>
      <ScrollArea className="flex-grow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleProjects.map(project => (
            <ProjectCard key={project.id} project={project} onOpenDetail={setSelectedProject} />
          ))}
        </div>
      </ScrollArea>

      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={(isOpen) => !isOpen && setSelectedProject(null)}>
          <DialogContent className="max-w-2xl acrylic-blur acrylic-light dark:acrylic-dark !bg-card/90 dark:!bg-card/90 p-0">
            <ScrollArea className="max-h-[80vh]">
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl flex items-center gap-3">
                  {selectedProject.icon && <span className="text-primary">{React.cloneElement(selectedProject.icon as React.ReactElement, { size: 28 })}</span>}
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="pl-[calc(28px+0.75rem)]">{selectedProject.category}</DialogDescription>
              </DialogHeader>
              <div className="p-6">
                <div className="relative w-full h-64 rounded-md overflow-hidden mb-4">
                  <Image 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint={selectedProject.imageHint || "project image"}
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4">{selectedProject.longDescription || selectedProject.description}</p>
                
                <h3 className="font-semibold mb-2">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{tech}</span>
                  ))}
                </div>

                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <>
                    <h3 className="font-semibold mb-2">Screenshots:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {selectedProject.screenshots.map((ss, idx) => (
                        <div key={idx} className="rounded-md overflow-hidden border">
                           <Image src={ss.url} alt={ss.caption || `Screenshot ${idx+1}`} width={600} height={400} objectFit="cover" data-ai-hint={ss.hint || "application screenshot"} />
                           {ss.caption && <p className="text-xs text-center p-1 bg-muted">{ss.caption}</p>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <DialogFooter className="p-6 pt-0 border-t sticky bottom-0 bg-card/90 dark:bg-card/90 acrylic-blur acrylic-light dark:acrylic-dark">
                <div className="flex gap-2 w-full">
                  {selectedProject.liveDemoUrl && selectedProject.liveDemoUrl !== '#' && (
                    <Button asChild variant="outline" className="flex-1">
                      <a href={selectedProject.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" /> Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <Button asChild variant="outline" className="flex-1">
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" /> View Code
                      </a>
                    </Button>
                  )}
                   <Button onClick={() => setSelectedProject(null)} variant="default" className="flex-1">Close</Button>
                </div>
              </DialogFooter>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectsApp;
