
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Info, Maximize, Loader2, Lightbulb, CheckCircle, Accessibility, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import type { Project, PlaceholderProject, FutureAdventureCategory } from '@/types';
import { sampleProjects, futureAdventuresData } from '@/data/projects';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge'; // Import Badge component

const ProjectCard: React.FC<{ project: Project; onOpenDetail: (project: Project) => void }> = ({ project, onOpenDetail }) => {
  const handleCardActivate = () => {
    onOpenDetail(project);
  };

  return (
    <Card
      className="relative z-[1] overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full bg-card/90 dark:bg-card/80 acrylic-blur acrylic-light dark:acrylic-dark group cursor-pointer"
      onClick={handleCardActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardActivate();
        }
      }}
      role="button"
      tabIndex={0}
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
         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
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

const FutureAdventureItem: React.FC<{ adventure: FutureAdventureCategory, onClick: (adventure: FutureAdventureCategory) => void }> = ({ adventure, onClick }) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex flex-col items-center justify-center h-28 p-2 text-center hover:opacity-100 w-full rounded-md transition-all duration-300 app-item future group",
        adventure.colorClass ? adventure.colorClass.replace('bg-', 'hover:bg-').replace('text-', 'hover:text-') : 'hover:bg-primary/20 dark:hover:bg-primary/10',
        'opacity-80' // Slightly dimmed by default
      )}
      onClick={() => onClick(adventure)}
      title={adventure.fullName}
    >
      <span className={cn("mb-2", adventure.colorClass ? adventure.colorClass.split(' ')[1] : 'text-primary')}>
          {React.cloneElement(adventure.icon as React.ReactElement, { size: 32 })}
      </span>
      <span className="text-xs leading-tight text-foreground">{adventure.name}</span>
       {adventure.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{adventure.description}</p>}
    </Button>
  );
};


const ProjectsApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const [singleGeneratedIdea, setSingleGeneratedIdea] = useState<PlaceholderProject | null>(null);
  const [isGeneratingIdea, setIsGeneratingIdea] = useState(false);
  const [currentAdventureCategory, setCurrentAdventureCategory] = useState<string | null>(null);


  const handleFutureAdventureClick = async (adventure: FutureAdventureCategory) => {
    setCurrentAdventureCategory(adventure.fullName);
    setIsGeneratingIdea(true);
    setSingleGeneratedIdea(null); 

    toast({
      title: `Exploring ${adventure.name}...`,
      description: `Generating an idea for ${adventure.fullName}.`,
      className: "notification future" 
    });

    try {
      const response = await fetch('/api/generate-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: adventure.fullName, numProjects: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Failed to generate idea (status: ${response.status})`);
      }

      const data = await response.json();
      if (data.projects && data.projects.length > 0) {
        setSingleGeneratedIdea(data.projects[0]);
        toast({
          title: "Idea Sparked!",
          description: `Here's an idea for ${adventure.fullName}.`,
          className: "notification future"
        });
      } else {
        toast({
          title: "Hmm...",
          description: `The AI couldn't conjure an idea for ${adventure.fullName} right now.`,
          variant: "default"
        });
        setSingleGeneratedIdea(null);
      }
    } catch (error) {
      console.error("Error generating single project idea:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({ title: "Idea Generation Failed", description: message, variant: "destructive" });
      setSingleGeneratedIdea(null);
    } finally {
      setIsGeneratingIdea(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      <header className="p-0 mb-4">
        <h1 className="text-xl font-semibold text-foreground">My Projects</h1>
        <p className="text-sm text-muted-foreground">Click on a project card to view details.</p>
      </header>
      <ScrollArea className="flex-grow pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {sampleProjects.map(project => (
            <ProjectCard key={project.id} project={project} onOpenDetail={setSelectedProject} />
          ))}
        </div>

        <Separator className="my-8 bg-border/50" />

        <div>
          <h3 className="text-lg font-semibold mb-1 text-foreground">Future Adventures</h3>
          <p className="text-sm text-muted-foreground mb-4">Areas I'm excited to explore next (click to spark an AI-generated idea!):</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
            {futureAdventuresData.map(adventure => (
              <FutureAdventureItem key={adventure.id} adventure={adventure} onClick={handleFutureAdventureClick} />
            ))}
          </div>
        </div>

        {/* Display Area for Single Generated Idea */}
        <div className="mt-8">
          {isGeneratingIdea && currentAdventureCategory && (
            <div className="flex flex-col items-center justify-center p-6 bg-muted/30 dark:bg-muted/20 rounded-lg min-h-[150px]">
              <Loader2 size={32} className="animate-spin text-primary mb-3" />
              <p className="text-sm text-muted-foreground">Sparking an idea for {currentAdventureCategory}...</p>
            </div>
          )}
          {!isGeneratingIdea && singleGeneratedIdea && currentAdventureCategory && (
            <div>
              <h4 className="text-md font-semibold mb-3 text-foreground flex items-center">
                <Lightbulb size={18} className="mr-2 text-primary" />
                AI-Sparked Idea for: {currentAdventureCategory}
              </h4>
              <Card className="bg-card/80 dark:bg-card/80 acrylic-blur acrylic-light dark:acrylic-dark">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">{singleGeneratedIdea.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-3 h-12 overflow-hidden text-ellipsis">{singleGeneratedIdea.description}</p>
                  <div className="mt-2">
                    <h5 className="text-xs font-semibold mb-1 text-primary/90">Potential Tech:</h5>
                    <div className="flex flex-wrap gap-1">
                      {singleGeneratedIdea.technologyStack.map(tech => (
                        <span key={tech} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground italic w-full truncate">Image prompt hint: {singleGeneratedIdea.imagePrompt}</p>
                </CardFooter>
              </Card>
            </div>
          )}
          {!isGeneratingIdea && !singleGeneratedIdea && currentAdventureCategory && (
             <div className="text-center p-6 bg-muted/30 dark:bg-muted/20 rounded-lg min-h-[100px] flex flex-col justify-center items-center">
                <h4 className="text-md font-semibold mb-2 text-foreground">
                    For: {currentAdventureCategory}
                </h4>
                <p className="text-sm text-muted-foreground">No specific idea generated this time, or the AI is pondering. Try another adventure or try again later!</p>
            </div>
          )}
           {!currentAdventureCategory && !isGeneratingIdea && (
            <div className="text-center p-4 text-muted-foreground mt-4">
              <Lightbulb size={24} className="mx-auto mb-2 text-primary/70" />
              Click an adventure above to spark a unique project idea!
            </div>
          )}
        </div>
      </ScrollArea>

      {selectedProject && (
         <Dialog open={!!selectedProject} onOpenChange={(isOpen) => !isOpen && setSelectedProject(null)}>
          <DialogContent className="max-w-3xl w-[90vw] md:w-full acrylic-blur acrylic-light dark:acrylic-dark !bg-card/95 dark:!bg-card/95 p-0 rounded-lg flex flex-col max-h-[85vh]">
            <DialogHeader className="p-6 pb-4 border-b border-border/50 shrink-0">
              <DialogTitle className="text-2xl flex items-center gap-3 text-foreground">
                {selectedProject.icon && React.cloneElement(selectedProject.icon as React.ReactElement, { size: 28, className: "text-primary"})}
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="pl-[calc(28px+0.75rem)] text-muted-foreground">
                {selectedProject.category} {selectedProject.status && <Badge variant={selectedProject.status === 'active' ? "default" : "secondary"} className="ml-2">{selectedProject.status}</Badge>}
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="flex-grow min-h-0">
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
                
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-foreground flex items-center"><Tag size={16} className="mr-2 text-primary/80"/>Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="project-details text-foreground/90 text-sm leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: selectedProject.longDescription?.replace(/\n/g, '<br />') || selectedProject.description }} />

                <h3 className="font-semibold mb-2 text-foreground">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2 mb-6 tech-stack">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="text-xs bg-primary/20 text-primary-foreground dark:text-primary px-[10px] py-[5px] rounded-[15px] tech-item">{tech}</span>
                  ))}
                </div>

                {selectedProject.uiFeatures && selectedProject.uiFeatures.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-foreground flex items-center"><CheckCircle size={16} className="mr-2 text-primary/80"/>UI Features:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                      {selectedProject.uiFeatures.map(feature => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.accessibility && Object.keys(selectedProject.accessibility).length > 0 && (
                   <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-foreground flex items-center"><Accessibility size={16} className="mr-2 text-primary/80"/>Accessibility Features:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                      {Object.entries(selectedProject.accessibility)
                        .filter(([, value]) => value) // Only show true values
                        .map(([key, value]) => (
                          <li key={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedProject.stats && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-foreground">Project Stats:</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                      {Object.entries(selectedProject.stats).map(([key, value]) => (
                        <div key={key} className="bg-muted/50 p-2 rounded-md">
                          <p className="font-medium capitalize text-primary/90">{key.replace(/([A-Z])/g, ' $1')}:</p>
                          <p className="text-foreground/80">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


                {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                  <>
                    <h3 className="font-semibold mb-3 text-foreground">Screenshots:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 project-screenshots">
                      {selectedProject.screenshots.map((ss, idx) => (
                        <div key={idx} className="rounded-md overflow-hidden border border-border/20 shadow-md screenshot group relative">
                           <Image 
                            src={ss.thumbnailUrl || ss.url} // Prefer thumbnail for grid
                            alt={ss.caption || `Screenshot ${idx+1}`} 
                            width={300} // Smaller width for grid
                            height={200} // Smaller height for grid
                            objectFit="cover" 
                            data-ai-hint={ss.hint || "application screenshot"} 
                            loading="lazy" 
                            className="opacity-0 transition-opacity duration-300 loaded:opacity-100" 
                            onLoad={(e) => e.currentTarget.classList.add('loaded')} 
                           />
                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Maximize size={24} className="text-white" />
                           </div>
                           {ss.caption && <p className="text-xs text-center p-1.5 bg-muted/50 text-muted-foreground">{ss.caption}</p>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
            
            <DialogFooter className="p-6 pt-4 border-t border-border/50 shrink-0 acrylic-blur acrylic-light dark:acrylic-dark">
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
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectsApp;

