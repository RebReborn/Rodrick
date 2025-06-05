
"use client";

import React from 'react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import type { Skill } from '@/types';
import { skillsData } from '@/data/skills';
import { Github, Linkedin, Twitter, Instagram as InstagramIconLucide } from 'lucide-react'; // Using Lucide for consistency

const AboutApp: React.FC<{ windowId: string; appKey: string }> = () => {
  // User CSS: .about-content padding 20px; .profile-pic 150px, border 3px solid var(--win-blue);
  // .social-links gap 15px, icon size 24px; .tech-item styling
  return (
    <div className="h-full flex flex-col bg-transparent text-foreground"> {/* Window itself has padding now */}
      <ScrollArea className="flex-grow">
        <div className="p-0 md:p-2 about-content"> {/* Removed outer padding, using user CSS like structure */}
          <header className="flex flex-col items-center text-center pt-5 md:pt-2">
            <Avatar className="w-[150px] h-[150px] border-4 border-primary mb-5 profile-pic"> {/* User CSS size and border */}
              <AvatarImage src="https://placehold.co/200x200.png" alt="Rodrick Ramadhani" data-ai-hint="professional portrait" />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Rodrick Ramadhani</h1>
            <p className="text-lg text-muted-foreground mt-1">Software Developer | Designer | Creative Thinker</p>
            
            {/* User CSS: .social-links */}
            <div className="flex gap-[15px] my-5 social-links">
              <a href="https://github.com/Rebreborn" className="text-foreground hover:text-primary transition-transform hover:scale-120" target="_blank" rel="noopener noreferrer" title="GitHub">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/rodrickramadhani" className="text-foreground hover:text-primary transition-transform hover:scale-120" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="https://x.com/mistakesacademy" className="text-foreground hover:text-primary transition-transform hover:scale-120" target="_blank" rel="noopener noreferrer" title="Twitter/X">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-transform hover:scale-120" target="_blank" rel="noopener noreferrer" title="Instagram">
                <InstagramIconLucide size={24} />
              </a>
            </div>
          </header>

          <section className="mb-8 text-center max-w-xl mx-auto">
            <p className="text-base leading-relaxed text-foreground/90">
              I'm a passionate developer with experience in web and mobile applications. I love solving complex problems and creating beautiful, functional interfaces. My journey into technology started with a fascination for how software can solve real-world problems and enhance human experiences. 
              I thrive in collaborative environments and am always eager to learn new technologies and methodologies.
            </p>
          </section>

          <section className="max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-primary/90 text-center">Skills</h2>
            {/* User CSS: .tech-stack for skills */}
            <div className="flex flex-wrap gap-2.5 justify-center mb-6 tech-stack">
                {skillsData.map((skill) => (
                     <span key={skill.name} className="text-xs bg-primary/20 text-primary-foreground dark:text-primary px-[10px] py-[5px] rounded-[15px] tech-item">{skill.name} ({skill.level}%)</span>
                ))}
                 <span className="text-xs bg-accent/20 text-accent-foreground dark:text-accent px-[10px] py-[5px] rounded-[15px] tech-item">UI/UX Design</span>
                 <span className="text-xs bg-accent/20 text-accent-foreground dark:text-accent px-[10px] py-[5px] rounded-[15px] tech-item">Photography</span>
            </div>
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

           <section className="mt-10 text-center max-w-xl mx-auto pb-5">
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
