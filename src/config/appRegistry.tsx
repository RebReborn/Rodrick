
import type React from 'react';
import { Folder, User, Mail, FileText, Camera, Smartphone, Gamepad2, Zap, BarChart3, Brain, Palette, Server, ShieldAlert, Settings, Code } from 'lucide-react';
import type { AppDefinition } from '@/types';

// Import actual app components
import ProjectsApp from '@/components/apps/ProjectsApp';
import AboutApp from '@/components/apps/AboutApp';
import ContactApp from '@/components/apps/ContactApp';
import ResumeApp from '@/components/apps/ResumeApp';
import PhotographyApp from '@/components/apps/PhotographyApp';
import FutureProjectsApp from '@/components/apps/FutureProjectsApp';
import TerminalApp from '@/components/apps/TerminalApp'; // Import the new TerminalApp

// Placeholder for other apps not yet fully implemented
const PlaceholderAppComponent = ({ windowId, appKey }: { windowId: string, appKey: string }) => (
  <div className="p-4 h-full flex flex-col items-center justify-center bg-background">
    <h2 className="text-2xl font-semibold mb-2">{appKey.charAt(0).toUpperCase() + appKey.slice(1)}</h2>
    <p className="text-muted-foreground">Content for {appKey} (Window ID: {windowId})</p>
    <p className="text-xs mt-4">Component: <code>src/components/apps/{appKey.charAt(0).toUpperCase() + appKey.slice(1)}App.tsx</code></p>
  </div>
);


export const appRegistry: AppDefinition[] = [
  {
    key: 'projects',
    name: 'Projects',
    icon: <Folder />,
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 400, height: 300 },
    isResizable: true,
    component: ProjectsApp,
  },
  {
    key: 'about',
    name: 'About Me',
    icon: <User />,
    defaultSize: { width: 600, height: 700 },
    minSize: { width: 350, height: 400 },
    isResizable: true,
    component: AboutApp,
  },
  {
    key: 'contact',
    name: 'Contact',
    icon: <Mail />,
    defaultSize: { width: 500, height: 650 },
    minSize: { width: 300, height: 400 },
    isResizable: true,
    component: ContactApp,
  },
  {
    key: 'resume',
    name: 'Resume',
    icon: <FileText />,
    defaultSize: { width: 700, height: 800 },
    minSize: { width: 400, height: 500 },
    isResizable: true,
    component: ResumeApp,
  },
  {
    key: 'photography',
    name: 'Photography',
    icon: <Camera />,
    defaultSize: { width: 900, height: 600 },
    minSize: { width: 500, height: 400 },
    isResizable: true,
    component: PhotographyApp,
  },
  {
    key: 'futureProjects',
    name: 'Future Projects',
    icon: <Zap />, 
    defaultSize: { width: 750, height: 550 },
    minSize: { width: 450, height: 350 },
    isResizable: true,
    component: FutureProjectsApp,
  },
  {
    key: 'terminal',
    name: 'Terminal',
    icon: <Code />,
    defaultSize: { width: 600, height: 400 },
    minSize: { width: 400, height: 300 }, // Slightly increased min size for better usability
    isResizable: true,
    component: TerminalApp, // Use the new TerminalApp
  },
  {
    key: 'settingsApp', 
    name: 'Settings',
    icon: <Settings />, 
    defaultSize: { width: 500, height: 400 },
    minSize: { width: 300, height: 200 },
    component: (props) => <PlaceholderAppComponent {...props} />,
  },
   {
    key: 'mobileDev',
    name: 'Mobile Apps',
    icon: <Smartphone />,
    defaultSize: { width: 400, height: 600},
    component: (props) => <PlaceholderAppComponent {...props} />,
  },
  {
    key: 'gameDev',
    name: 'Game Dev',
    icon: <Gamepad2 />,
    defaultSize: { width: 600, height: 400},
    component: (props) => <PlaceholderAppComponent {...props} />,
  },
  {
    key: 'dataViz',
    name: 'Data Viz',
    icon: <BarChart3 />,
    defaultSize: { width: 700, height: 500},
    component: (props) => <PlaceholderAppComponent {...props} />,
  },
  {
    key: 'aiProjectsAppDef', // Renamed to avoid confusion with FutureProjectsApp which is AI-powered
    name: 'AI Sandbox', // Changed name for clarity
    icon: <Brain />,
    defaultSize: { width: 600, height: 500},
    component: (props) => <PlaceholderAppComponent {...props} />,
  },
  {
    key: 'designWork',
    name: 'Design Work',
    icon: <Palette />,
    defaultSize: { width: 800, height: 600},
    component: (props) => <PlaceholderAppComponent {...props} />,
  },
  {
    key: 'backendApi',
    name: 'Backend APIs',
    icon: <Server />,
    defaultSize: { width: 500, height: 400},
    component: (props) => <PlaceholderAppComponent {...props} />,
  },
  {
    key: 'securityTools',
    name: 'Security Tools',
    icon: <ShieldAlert />,
    defaultSize: { width: 600, height: 450},
    component: (props) => <PlaceholderAppComponent {...props} />,
  },
];
