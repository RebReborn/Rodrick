"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import type { PlaceholderProject } from '@/types';
import { Rocket, Lightbulb, Loader2, Wand2 } from 'lucide-react';
import Image from 'next/image';

const projectCategories = [
  { value: "Mobile App Development", label: "Mobile App Development" },
  { value: "Game Development", label: "Game Development" },
  { value: "Data Visualization", label: "Data Visualization" },
  { value: "AI Projects", label: "AI Projects" },
  { value: "Design Work", label: "Design Work" },
  { value: "Backend API Development", label: "Backend API Development" },
  { value: "Cybersecurity Tools", label: "Cybersecurity Tools" },
];

const FutureProjectsApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(projectCategories[0].value);
  const [generatedProjects, setGeneratedProjects] = useState<PlaceholderProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateProjects = async () => {
    if (!selectedCategory) {
      toast({ title: "Select a category", description: "Please choose a project category first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setGeneratedProjects([]); // Clear previous projects

    try {
      const response = await fetch('/api/generate-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory, numProjects: 3 }), // Generate 3 projects
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || `Failed to generate projects (status: ${response.status})`);
      }

      const data = await response.json();
      if (data.projects && data.projects.length > 0) {
        setGeneratedProjects(data.projects);
        toast({ title: "Projects Generated!", description: `Successfully generated ${data.projects.length} ideas for ${selectedCategory}.` });
      } else {
         toast({ title: "No Projects Generated", description: "The AI couldn't generate project ideas for this category at the moment.", variant: "default" });
      }
    } catch (error) {
      console.error("Error generating projects:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({ title: "Generation Failed", description: message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      <header className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold flex items-center"><Lightbulb size={20} className="mr-2 text-primary"/>Future Project Ideas</h1>
            <p className="text-sm text-muted-foreground">Generate placeholder ideas for upcoming ventures.</p>
          </div>
        </div>
         <div className="mt-3 flex gap-2 items-end">
            <div className="flex-grow">
              <label htmlFor="category-select" className="text-xs font-medium text-muted-foreground">Select Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-select" className="w-full bg-card/80 dark:bg-card/80">
                  <SelectValue placeholder="Choose a category..." />
                </SelectTrigger>
                <SelectContent>
                  {projectCategories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerateProjects} disabled={isLoading} className="h-10">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Generate Ideas
            </Button>
          </div>
      </header>
      <ScrollArea className="flex-grow p-4">
        {isLoading && generatedProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Loader2 size={48} className="animate-spin text-primary mb-4" />
            <p>Generating project ideas... this might take a moment.</p>
          </div>
        )}
        {!isLoading && generatedProjects.length === 0 && (
           <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
            <Rocket size={48} className="text-primary mb-4" />
            <h2 className="text-lg font-medium mb-2">Ready to explore new ideas?</h2>
            <p className="text-sm">Select a category above and click "Generate Ideas" to see what the AI comes up with for your future projects!</p>
          </div>
        )}
        {generatedProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedProjects.map((project, index) => (
              <Card key={index} className="flex flex-col bg-card/80 dark:bg-card/80 acrylic-blur acrylic-light dark:acrylic-dark">
                <CardHeader>
                  <CardTitle className="text-md">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="relative w-full h-32 bg-muted rounded-md mb-3 overflow-hidden">
                    <Image src={`https://placehold.co/300x200.png?text=${encodeURIComponent(project.title.substring(0,15))}`} alt={project.title} layout="fill" objectFit="cover" data-ai-hint={project.imagePrompt.split(' ').slice(0,2).join(' ') || "project concept"}/>
                  </div>
                  <CardDescription className="text-xs h-16 overflow-hidden text-ellipsis">{project.description}</CardDescription>
                  <div className="mt-2">
                    <h4 className="text-xs font-semibold mb-1">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologyStack.map(tech => (
                        <span key={tech} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{tech}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground italic">Image Prompt: {project.imagePrompt}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default FutureProjectsApp;

