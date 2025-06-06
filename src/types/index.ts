import type React from 'react';

export interface WindowInstance {
  id: string;
  appKey: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  isDragging: boolean;
  isResizing: boolean;
  isFocusedOnMount?: boolean; // To auto-focus when opened
}

export interface AppDefinition {
  key: string;
  name: string;
  icon: React.ReactNode; // Can be Lucide icon component or SVG
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  isResizable?: boolean;
  component: (props: { windowId: string; appKey: string }) => React.ReactNode;
}

export interface Project {
  id: string;
  title: string;
  icon?: React.ReactNode;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  imageHint?: string;
  screenshots?: {
    url: string;
    hint?: string;
    caption?: string;
    thumbnailUrl?: string; // Added based on new data
  }[];
  liveDemoUrl?: string;
  githubUrl?: string;
  category?: string;
  status?: 'active' | 'archived' | 'development';
  featured?: boolean;
  tags?: string[];
  createdAt?: string; // Assuming string format like 'YYYY-MM-DD'
  updatedAt?: string; // Assuming string format like 'YYYY-MM-DD'
  stats?: Record<string, string | number>;
  uiFeatures?: string[];
  accessibility?: {
    keyboardNav?: boolean;
    screenReader?: boolean;
    contrastOptions?: boolean;
    reducedMotion?: boolean;
    highContrast?: boolean;
    textZoom?: boolean;
  };
}

export interface Skill {
  name: string;
  level: number; // Percentage 0-100
}

// For GenAI future projects
export interface PlaceholderProject {
  title: string;
  description: string;
  technologyStack: string[];
  imagePrompt: string;
}

// For Future Adventure Categories in projects.ts
export interface FutureAdventureCategory {
  id: string;
  name: string;
  fullName: string;
  icon: React.ReactNode;
  description?: string;
  colorClass?: string;
}
