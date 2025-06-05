"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, ExternalLink } from 'lucide-react';

const ResumeApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const resumeUrl = "/resume.pdf"; // Path to your resume in the public folder

  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      <header className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Resume</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" /> Open in New Tab
            </a>
          </Button>
          <Button asChild variant="default" size="sm">
            <a href={resumeUrl} download="YourName_Resume.pdf">
              <Download size={16} className="mr-2" /> Download PDF
            </a>
          </Button>
        </div>
      </header>
      <ScrollArea className="flex-grow">
        {/* Option 1: Embed PDF if browser supports it well */}
        <iframe
          src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          title="Resume"
          className="w-full h-full border-0"
          // sandbox="allow-scripts allow-same-origin" // For security, if resume is from untrusted source
        />
        {/* Option 2: Fallback or alternative: Show an image or a message */}
        {/* <div className="p-8 text-center">
             <p className="text-muted-foreground">Resume preview. Please use buttons above to open or download.</p>
             <Image src="/path/to/resume_preview.png" alt="Resume Preview" width={800} height={1100} className="mx-auto mt-4 border" />
           </div> */}
      </ScrollArea>
    </div>
  );
};

export default ResumeApp;
