
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, ExternalLink } from 'lucide-react';

const ResumeApp: React.FC<{ windowId: string; appKey: string }> = () => {
  const resumeUrl = "/resume.pdf"; // Path to your resume in the public folder

  // User CSS: .download-btn
  // User CSS: .resume-content (overall padding already handled by window), .resume-section, .resume-item
  return (
    <div className="h-full flex flex-col bg-transparent text-foreground"> {/* Window itself has padding now */}
      <header className="p-0 mb-4 flex justify-between items-center"> {/* Parent provides padding */}
        <h1 className="text-xl font-semibold">My Resume</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" /> Open New Tab
            </a>
          </Button>
          <Button asChild variant="default" size="sm" className="submit-btn bg-primary hover:bg-primary/90 text-primary-foreground download-btn">
            <a href={resumeUrl} download="RodrickRamadhani_Resume.pdf"> {/* Updated filename */}
              <Download size={16} className="mr-2" /> Download PDF
            </a>
          </Button>
        </div>
      </header>
      <ScrollArea className="flex-grow resume-content"> {/* Added class for potential global style hook */}
        <iframe
          src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          title="Resume"
          className="w-full h-full border-0 rounded" // Added rounded
        />
      </ScrollArea>
    </div>
  );
};

export default ResumeApp;
