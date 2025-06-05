import type React from 'react';
import type { Project, FutureAdventureCategory } from '@/types';

// Import all icons
import {
  DtunesIcon,
  DzalekaIcon,
  TelegramDownloaderIcon,
  LoopHireIcon,
  RebornPixelsIcon,
  WindowsOfHopeIcon,
  InstagramCheckerIcon,
  MobileAppDevIcon,
  GameDevIcon,
  DataVizIcon,
  AiProjectsIcon,
  DesignWorkIcon,
  BackendApiIcon,
  SecurityToolsIcon
} from './project-icons';

// Color palette for project categories
const categoryColors: Record<string, string> = {
  'Web Platform': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Social Platform': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Utility Tool': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Photography Portfolio': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
};

export const sampleProjects: Project[] = [
  {
    id: 'dtunes-music-platform',
    title: 'dTunes Music Platform',
    icon: DtunesIcon,
    description: 'A full-stack music platform empowering independent artists.',
    longDescription: `dTunes revolutionizes music distribution by giving artists direct control over their work. This comprehensive platform features artist verification, music uploads with metadata, custom playlist creation, and integrated Stripe payments. The admin dashboard provides detailed analytics on listens and earnings.

Key Features:
- Artist profiles with verification system
- Audio upload with cover art and metadata
- Listener analytics dashboard
- Stripe integration for payments
- Responsive design for all devices`,
    technologies: ['Next.js', 'Firebase', 'Stripe API', 'Tailwind CSS', 'Framer Motion'],
    imageUrl: 'https://placehold.co/600x400/1e3a8a/ffffff?text=dTunes+Music',
    imageHint: 'music platform interface showing player and analytics',
    screenshots: [
      { 
        url: 'https://placehold.co/1280x720/1e3a8a/ffffff?text=Music+Player', 
        hint: 'music player interface', 
        caption: 'Main Player Interface with Waveform Visualization',
        thumbnailUrl: 'https://placehold.co/300x200/1e3a8a/ffffff?text=Player+Thumb'
      },
      { 
        url: 'https://placehold.co/1280x720/1e3a8a/ffffff?text=Artist+Dashboard', 
        hint: 'artist analytics dashboard', 
        caption: 'Artist Analytics Dashboard with Earnings Breakdown',
        thumbnailUrl: 'https://placehold.co/300x200/1e3a8a/ffffff?text=Dashboard+Thumb'
      },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Web Platform',
    status: 'active',
    featured: true,
    tags: ['music', 'streaming', 'artists', 'analytics'],
    createdAt: '2023-01-15',
    updatedAt: '2023-06-20',
    stats: {
      users: '10K+',
      rating: '4.8/5',
      uptime: '99.9%'
    },
    // UI/UX enhancements
    uiFeatures: [
      'Dark/light mode toggle',
      'Interactive audio waveform',
      'Animated transitions',
      'Responsive grid layout'
    ],
    accessibility: {
      keyboardNav: true,
      screenReader: true,
      contrastOptions: true
    }
  },
  {
    id: 'dzaleka-online-community',
    title: 'Dzaleka Online',
    icon: DzalekaIcon,
    description: 'Social platform connecting refugee communities.',
    longDescription: `Dzaleka Online creates a digital home for displaced communities, offering secure communication tools in multiple languages. The platform features real-time chat, media sharing, and community support systems while maintaining strict privacy controls.

Key Features:
- Multilingual interface (4 languages)
- End-to-end encrypted messaging
- Media sharing with compression
- Community moderation tools
- Offline-first functionality`,
    technologies: ['Next.js', 'Firebase', 'WebSockets', 'i18n', 'Workbox'],
    imageUrl: 'https://placehold.co/600x400/5b21b6/ffffff?text=Dzaleka+Online',
    imageHint: 'community interface showing chat and events',
    screenshots: [
      { 
        url: 'https://placehold.co/1280x720/5b21b6/ffffff?text=Secure+Chat', 
        hint: 'encrypted chat interface', 
        caption: 'Secure Messaging with Translation Options',
        thumbnailUrl: 'https://placehold.co/300x200/5b21b6/ffffff?text=Chat+Thumb'
      },
      { 
        url: 'https://placehold.co/1280x720/5b21b6/ffffff?text=Community+Feed', 
        hint: 'community event feed', 
        caption: 'Community Feed with Upcoming Events',
        thumbnailUrl: 'https://placehold.co/300x200/5b21b6/ffffff?text=Feed+Thumb'
      },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Social Platform',
    status: 'active',
    featured: true,
    tags: ['community', 'refugees', 'messaging', 'multilingual'],
    createdAt: '2022-09-10',
    updatedAt: '2023-05-15',
    stats: {
      users: '5K+',
      languages: 4,
      messages: '1M+ monthly'
    },
    // UI/UX enhancements
    uiFeatures: [
      'Language switcher',
      'Offline indicator',
      'Typing indicators',
      'Accessibility menu'
    ],
    accessibility: {
      keyboardNav: true,
      screenReader: true,
      textZoom: true
    }
  },
  {
    id: 'telegram-media-downloader-tool',
    title: 'Telegram Media Downloader',
    icon: TelegramDownloaderIcon,
    description: 'Browser-based Telegram content downloader.',
    longDescription: `This tool enables secure downloading of media from Telegram channels without storing credentials. It features batch downloading, media previews, and organizes content by date/channel with client-side processing.

Key Features:
- Telegram API authentication
- Media preview before download
- Batch download queuing
- Client-side only processing
- Channel-based organization`,
    technologies: ['React', 'Telegram API', 'GramJS', 'IndexedDB', 'Tailwind CSS'],
    imageUrl: 'https://placehold.co/600x400/065f46/ffffff?text=Telegram+Downloader',
    imageHint: 'downloader application interface',
    screenshots: [
      { 
        url: 'https://placehold.co/1280x720/065f46/ffffff?text=Download+Settings', 
        hint: 'download configuration screen', 
        caption: 'Download Configuration with Quality Options',
        thumbnailUrl: 'https://placehold.co/300x200/065f46/ffffff?text=Settings+Thumb'
      },
      { 
        url: 'https://placehold.co/1280x720/065f46/ffffff?text=File+Browser', 
        hint: 'organized downloads browser', 
        caption: 'Organized Downloads by Channel and Date',
        thumbnailUrl: 'https://placehold.co/300x200/065f46/ffffff?text=Browser+Thumb'
      },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Utility Tool',
    status: 'active',
    featured: false,
    tags: ['telegram', 'downloader', 'media', 'privacy'],
    createdAt: '2023-03-05',
    updatedAt: '2023-07-18',
    stats: {
      downloads: '50K+',
      avgRating: '4.6/5',
      supportedFormats: 8
    },
    // UI/UX enhancements
    uiFeatures: [
      'Drag-and-drop organization',
      'Bulk selection',
      'Download progress indicators',
      'Dark mode'
    ],
    accessibility: {
      keyboardNav: true,
      reducedMotion: true,
      highContrast: true
    }
  },
  // ... (other projects with similar enhancements)
];

export const futureAdventuresData: FutureAdventureCategory[] = [
  { 
    id: 'mobile-app-dev', 
    name: 'Mobile App', 
    fullName: 'Mobile App Development', 
    icon: MobileAppDevIcon,
    description: 'Cross-platform mobile experiences with React Native and Flutter',
    colorClass: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
  },
  { 
    id: 'game-dev', 
    name: 'Game Dev', 
    fullName: 'Game Development', 
    icon: GameDevIcon,
    description: 'Interactive gaming experiences with Unity and WebGL',
    colorClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  },
  { 
    id: 'data-viz', 
    name: 'Data Viz', 
    fullName: 'Data Visualization', 
    icon: DataVizIcon,
    description: 'Beautiful, interactive data stories with D3.js and Three.js',
    colorClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  },
  { 
    id: 'ai-projects', 
    name: 'AI Project', 
    fullName: 'AI Projects', 
    icon: AiProjectsIcon,
    description: 'Machine learning applications and AI integrations',
    colorClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  },
  { 
    id: 'design-work', 
    name: 'Design Work', 
    fullName: 'Design Work', 
    icon: DesignWorkIcon,
    description: 'UI/UX design systems and interactive prototypes',
    colorClass: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
  },
  { 
    id: 'backend-api', 
    name: 'Backend API', 
    fullName: 'Backend API Development', 
    icon: BackendApiIcon,
    description: 'Scalable server architectures and microservices',
    colorClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  },
  { 
    id: 'security-tools', 
    name: 'Security Tool', 
    fullName: 'Security Tools', 
    icon: SecurityToolsIcon,
    description: 'Privacy-focused applications and security utilities',
    colorClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
];

// Utility function to get category color
export const getCategoryColor = (category: string): string => {
  return categoryColors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};

// Types for reference (should be in your types.ts)
/*
interface Project {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  imageHint: string;
  screenshots: {
    url: string;
    hint: string;
    caption: string;
    thumbnailUrl?: string;
  }[];
  liveDemoUrl: string;
  githubUrl: string;
  category: string;
  status?: 'active' | 'archived' | 'development';
  featured?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
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

interface FutureAdventureCategory {
  id: string;
  name: string;
  fullName: string;
  icon: React.ReactNode;
  description?: string;
  colorClass?: string;
}
*/