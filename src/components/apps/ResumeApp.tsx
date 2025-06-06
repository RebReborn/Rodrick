
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Mail, Phone, MapPin, Briefcase, Code, GraduationCap, Workflow } from 'lucide-react';
import { useWindowManager } from '@/contexts/WindowManagerContext';
import { appRegistry } from '@/config/appRegistry';

const ResumeApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const resumePdfUrl = "/Rodrick-Reborn-Resume.pdf"; // Ensure this file is in your /public folder
  const { openWindow } = useWindowManager();

  const handleContactClick = () => {
    const contactApp = appRegistry.find(app => app.key === 'contact');
    if (contactApp) {
      openWindow(contactApp.key);
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent text-foreground">
      <header className="p-0 mb-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Resume</h1>
        <div className="flex gap-2">
          <Button asChild variant="default" size="sm" className="submit-btn bg-primary hover:bg-primary/90 text-primary-foreground download-btn">
            <a href={resumePdfUrl} download="RodrickRamadhani_Resume.pdf">
              <Download size={16} className="mr-2" /> Download PDF
            </a>
          </Button>
        </div>
      </header>
      <ScrollArea className="flex-grow"> {/* Removed p-1 and resume-content classes */}
        <div className="max-w-4xl mx-auto bg-card p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
          {/* Resume Header */}
          <div className="text-center border-b border-border pb-6 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-1">Rodrick Ramadhani</h1>
            <p className="text-lg text-muted-foreground mb-3">Software Developer & Creative Technologist</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-x-4 gap-y-2 text-sm text-foreground/80">
              <span className="flex items-center"><Mail size={14} className="mr-2 text-primary/80" /> rodrickreborn@gmail.com</span>
              <span className="flex items-center"><Phone size={14} className="mr-2 text-primary/80" /> (123) 456-7890</span>
              <span className="flex items-center"><MapPin size={14} className="mr-2 text-primary/80" /> Edmonton, Canada</span>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center"><Briefcase size={20} className="mr-3" /> Professional Experience</h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-foreground">Freelance Full-Stack Developer</h3>
              <div className="text-sm text-muted-foreground mb-2">2020 - Present</div>
              <ul className="list-disc list-inside space-y-1 text-foreground/90 pl-2">
                <li>Developed dTunes - A music platform for local artists with Stripe integration</li>
                <li>Created Dzaleka Online - A community social platform for refugees</li>
                <li>Built Windows of Hope - A nonprofit platform with donation processing</li>
                <li>Designed and implemented multiple web applications using React, Next.js, and Firebase</li>
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center"><Code size={20} className="mr-3" /> Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-md font-semibold text-foreground/90 mb-2">Frontend</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 pl-2">
                  <li>React</li>
                  <li>Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="text-md font-semibold text-foreground/90 mb-2">Backend</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 pl-2">
                  <li>Node.js</li>
                  <li>Firebase</li>
                  <li>MongoDB</li>
                  <li>API Design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-md font-semibold text-foreground/90 mb-2">Tools</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 pl-2">
                  <li>Git</li>
                  <li>Docker</li>
                  <li>Figma</li>
                  <li>Cloudinary</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center"><GraduationCap size={20} className="mr-3" /> Education</h2>
            <div>
              <h3 className="text-lg font-medium text-foreground">Self-Taught Developer</h3>
              <div className="text-sm text-muted-foreground mb-1">2018 - Present</div>
              <p className="text-foreground/90 text-sm">Continuous learning through online courses, documentation, and practical project building.</p>
            </div>
          </div>

          {/* Notable Projects */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center"><Workflow size={20} className="mr-3" /> Notable Projects</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-md font-semibold text-foreground/90">dTunes</h3>
                <p className="text-sm text-foreground/80">Music platform for local artists with payment integration.</p>
              </div>
              <div>
                <h3 className="text-md font-semibold text-foreground/90">Dzaleka Online</h3>
                <p className="text-sm text-foreground/80">Community social platform connecting refugees.</p>
              </div>
              <div>
                <h3 className="text-md font-semibold text-foreground/90">Telegram Media Downloader</h3>
                <p className="text-sm text-foreground/80">Browser-based tool for downloading Telegram media.</p>
              </div>
            </div>
          </div>

          {/* Resume Actions */}
          <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
              <a href={resumePdfUrl} download="RodrickRamadhani_Resume.pdf">
                <Download size={16} className="mr-2" /> Download PDF
              </a>
            </Button>
            <Button variant="outline" onClick={handleContactClick} className="border-primary text-primary hover:bg-primary/10 hover:text-primary w-full sm:w-auto">
              <Mail size={16} className="mr-2" /> Contact Me
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ResumeApp;
