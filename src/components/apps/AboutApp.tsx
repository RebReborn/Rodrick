"use client";

import React from 'react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import type { Skill } from '@/types';
import { skillsData } from '@/data/skills';

const AboutApp: React.FC<{ windowId: string; appKey: string }> = () => {
  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      <ScrollArea className="flex-grow">
        <div className="p-6 md:p-8">
          <header className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-6 border-b">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-2 border-primary">
              <AvatarImage src="https://placehold.co/200x200.png" alt="Your Name" data-ai-hint="professional portrait" />
              <AvatarFallback>YN</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Your Name</h1>
              <p className="text-lg text-muted-foreground mt-1">Aspiring Full-Stack Developer | Creative Thinker | Tech Enthusiast</p>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3 text-primary/90">About Me</h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-3">
              Hello! I'm a passionate and driven developer with a keen interest in creating innovative and user-friendly applications. 
              My journey into technology started with a fascination for how software can solve real-world problems and enhance human experiences. 
              I thrive in collaborative environments and am always eager to learn new technologies and methodologies.
            </p>
            <p className="text-base leading-relaxed text-foreground/90">
              Outside of coding, I enjoy [Your Hobby 1, e.g., landscape photography], [Your Hobby 2, e.g., hiking], and [Your Hobby 3, e.g., exploring new cuisines]. 
              These activities help me stay creative and bring fresh perspectives to my work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-primary/90">My Skills</h2>
            <div className="space-y-5">
              {skillsData.map((skill: Skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 [&>div]:bg-primary" />
                </div>
              ))}
            </div>
          </section>

           <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3 text-primary/90">Interests & Goals</h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-3">
              I'm particularly interested in exploring fields like Artificial Intelligence, Web3 technologies, and scalable cloud architectures. 
              My goal is to contribute to projects that make a tangible impact, continuously pushing the boundaries of what's possible with technology.
              I am actively seeking opportunities to apply my skills and grow as a developer.
            </p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AboutApp;
