
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
  SecurityToolsIcon,
  FluentFolioIcon
} from './project-icons';

// Color palette for project categories
const categoryColors: Record<string, string> = {
  'Web Platform': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Social Platform': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Utility Tool': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Photography Portfolio': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'Portfolio Application': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
};

export const sampleProjects: Project[] = [
  {
    id: 'fluentfolio-interactive-os',
    title: 'FluentFolio - Interactive OS Portfolio',
    icon: FluentFolioIcon,
    description: 'An interactive, Windows 11-style portfolio showcasing projects, skills, and experience.',
    longDescription: `FluentFolio is a dynamic and engaging web application designed to mimic a desktop operating system environment. It allows users to explore various 'apps' which represent different facets of a professional portfolio, including project showcases, an 'About Me' section, a resume viewer, a contact form, and even a functional terminal and settings panel. Built with Next.js, React, Tailwind CSS, and ShadCN UI components, and Genkit for AI-powered features.`,
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Framer Motion', 'Lucide Icons', 'Genkit'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'desktop portfolio',
    screenshots: [
      {
        url: 'https://placehold.co/1280x720.png',
        hint: 'desktop view',
        caption: 'Main Desktop Interface',
        thumbnailUrl: 'https://placehold.co/300x200.png'
      },
      {
        url: 'https://placehold.co/1280x720.png',
        hint: 'app window',
        caption: 'Application Window Example (Projects App)',
        thumbnailUrl: 'https://placehold.co/300x200.png'
      },
    ],
    liveDemoUrl: '#', // This is the current site
    githubUrl: '#', // Placeholder for actual repo
    category: 'Portfolio Application',
    status: 'active',
    featured: true,
    tags: ['portfolio', 'interactive', 'os-theme', 'nextjs', 'react'],
    createdAt: '2024-07-01', // Example date
    updatedAt: '2024-07-28', // Example date
    stats: {
      components: '50+',
      apps: '8+',
      linesOfCode: '10K+'
    },
    uiFeatures: [
      'Windows 11-inspired UI',
      'Draggable & Resizable Windows',
      'Functional Taskbar & Start Menu',
      'Desktop Icons & Context Menus',
      'Light/Dark Theme Toggle',
      'Integrated App Components'
    ],
    accessibility: {
      keyboardNav: true,
      screenReader: true,
      contrastOptions: true,
      reducedMotion: false, // Assuming animations are used
      textZoom: true
    }
  },
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
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'music platform',
    screenshots: [
      {
        url: 'https://placehold.co/1280x720.png',
        hint: 'music player',
        caption: 'Main Player Interface with Waveform Visualization',
        thumbnailUrl: 'https://placehold.co/300x200.png'
      },
      {
        url: 'https://placehold.co/1280x720.png',
        hint: 'analytics dashboard',
        caption: 'Artist Analytics Dashboard with Earnings Breakdown',
        thumbnailUrl: 'https://placehold.co/300x200.png'
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
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'community interface',
    screenshots: [
      {
        url: 'https://placehold.co/1280x720.png',
        hint: 'chat interface',
        caption: 'Secure Messaging with Translation Options',
        thumbnailUrl: 'https://placehold.co/300x200.png'
      },
      {
        url: 'https://placehold.co/1280x720.png',
        hint: 'event feed',
        caption: 'Community Feed with Upcoming Events',
        thumbnailUrl: 'https://placehold.co/300x200.png'
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
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'downloader interface',
    screenshots: [
      {
        url: 'https://placehold.co/1280x720.png',
        hint: 'download config',
        caption: 'Download Configuration with Quality Options',
        thumbnailUrl: 'https://placehold.co/300x200.png'
      },
      {
        url: 'https://placehold.co/1280x720.png',
        hint: 'file browser',
        caption: 'Organized Downloads by Channel and Date',
        thumbnailUrl: 'https://placehold.co/300x200.png'
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
   {
    id: 'loophire-job-platform',
    title: 'LoopHire',
    icon: LoopHireIcon,
    description: 'Social job referral platform.',
    longDescription: `LoopHire transforms job searching through professional networks. The platform verifies work histories and enables direct referral requests with real-time status tracking and interview preparation resources.

Key Features:
- Profile verification system
- Referral request workflow
- Application tracking
- Interview preparation kits
- Real-time notifications`,
    technologies: ['React', 'Firebase', 'Algolia Search', 'Figma', 'Firestore'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'job platform',
    screenshots: [
      { url: 'https://placehold.co/1280x720.png', hint: 'user profile', caption: 'User Profile & Verification', thumbnailUrl: 'https://placehold.co/300x200.png' },
      { url: 'https://placehold.co/1280x720.png', hint: 'referral tracking', caption: 'Referral Status Dashboard', thumbnailUrl: 'https://placehold.co/300x200.png' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Web Platform',
  },
  {
    id: 'reborn-pixels-portfolio',
    title: 'Reborn Pixels',
    icon: RebornPixelsIcon,
    description: 'Photography portfolio with CMS.',
    longDescription: `A visually stunning portfolio showcasing photographic work with Cloudinary integration for high-performance image delivery. Includes client galleries, EXIF data display, and password-protected collections.

Key Features:
- Dynamic image galleries
- EXIF data visualization
- Client proofing system
- Cloudinary media management
- Mobile-optimized viewer`,
    technologies: ['Next.js', 'Cloudinary', 'EXIF.js', 'Framer Motion', 'Tailwind CSS'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'photography gallery',
    screenshots: [
      { url: 'https://placehold.co/1280x720.png', hint: 'photo showcase', caption: 'Main Gallery View', thumbnailUrl: 'https://placehold.co/300x200.png' },
      { url: 'https://placehold.co/1280x720.png', hint: 'image details', caption: 'EXIF Data Display', thumbnailUrl: 'https://placehold.co/300x200.png' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Photography Portfolio',
  },
  {
    id: 'windows-of-hope-npo-platform',
    title: 'Windows of Hope',
    icon: WindowsOfHopeIcon,
    description: 'Nonprofit management platform.',
    longDescription: `Comprehensive solution for NGOs featuring donor management, volunteer coordination, and impact reporting. Includes customizable donation flows and real-time campaign analytics.

Key Features:
- Donor CRM system
- Volunteer scheduling
- Campaign analytics
- Recurring donations
- Impact storytelling tools`,
    technologies: ['Next.js', 'MongoDB', 'Stripe', 'Chart.js', 'Nodemailer'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'nonprofit dashboard',
    screenshots: [
      { url: 'https://placehold.co/1280x720.png', hint: 'donor management', caption: 'Donor Management Interface', thumbnailUrl: 'https://placehold.co/300x200.png' },
      { url: 'https://placehold.co/1280x720.png', hint: 'campaign stats', caption: 'Campaign Impact Analytics', thumbnailUrl: 'https://placehold.co/300x200.png' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Web Platform',
  },
  {
    id: 'instagram-nonfollowers-checker-tool',
    title: 'Instagram Non-Followers Checker',
    icon: InstagramCheckerIcon,
    description: 'Browser-based follower analysis tool.',
    longDescription: `Privacy-focused tool that analyzes follower relationships locally in your browser. Processes exported Instagram data to identify non-reciprocal relationships and ghost followers without API access.

Key Features:
- Client-side data processing
- CSV/JSON import/export
- Relationship visualization
- Privacy guarantee (no server processing)
- Custom filtering options`,
    technologies: ['Vanilla JS', 'FileReader API', 'Chart.js', 'Bootstrap', 'LocalStorage'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'follower analysis',
    screenshots: [
      { url: 'https://placehold.co/1280x720.png', hint: 'data import', caption: 'Data Import Screen', thumbnailUrl: 'https://placehold.co/300x200.png' },
      { url: 'https://placehold.co/1280x720.png', hint: 'analysis results', caption: 'Follower Analysis Results', thumbnailUrl: 'https://placehold.co/300x200.png' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Utility Tool',
  },
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
