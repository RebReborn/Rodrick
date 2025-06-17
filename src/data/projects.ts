
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
  FluentFolioIcon,
  RebornProjectIcon,
  SynapseSnapIcon,
  DoPeVestIcon,
  MaliPayIcon,
  FitJourneyIcon,
  StreamPulseIcon,
  MalawiMarketConnectIcon,
  MelodyShareIcon,
  CollabInvestIcon
} from './project-icons';

// Color palette for project categories
const categoryColors: Record<string, string> = {
  'Web Platform': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Social Platform': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Utility Tool': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Photography Portfolio': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'Portfolio Application': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  'Innovation Platform': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'AI Application': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  'Investment Platform': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
  'Payment Solution': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
  'Fitness Application': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  'Analytics Tool': 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
  'Marketplace': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'Music Platform': 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200',
  'Investment Tool': 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
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
        thumbnailUrl: 'https://placehold.co/300x200.png',
        hint: 'desktop view',
        caption: 'Main Desktop Interface'
      },
      {
        url: 'https://placehold.co/1280x720.png',
        thumbnailUrl: 'https://placehold.co/300x200.png',
        hint: 'app window',
        caption: 'Application Window Example (Projects App)'
      },
    ],
    liveDemoUrl: '#', 
    githubUrl: '#', 
    category: 'Portfolio Application',
    status: 'active',
    featured: true,
    tags: ['portfolio', 'interactive', 'os-theme', 'nextjs', 'react'],
    createdAt: '2024-07-01',
    updatedAt: '2024-07-28',
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
      reducedMotion: false,
      textZoom: true
    }
  },
  {
    id: 'reborn-project',
    title: 'Reborn',
    icon: RebornProjectIcon,
    description: "A project focused on innovative solutions and new beginnings.",
    longDescription: "This project explores cutting-edge technologies to deliver innovative solutions, aiming to redefine user experiences and introduce new paradigms. Placeholder for more details.",
    technologies: ['Next.js', 'Genkit AI', 'Serverless', 'TypeScript'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'abstract concept',
    screenshots: [{ url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'concept preview', caption: 'Conceptual design' }],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Innovation Platform',
    status: 'active',
    tags: ['innovation', 'ai', 'future-tech'],
    createdAt: '2024-05-01',
    updatedAt: '2024-07-20',
  },
  {
    id: 'synapse-snap',
    title: 'Synapse Snap',
    icon: SynapseSnapIcon,
    description: "Capturing and connecting ideas with intelligent insights.",
    longDescription: "Synapse Snap leverages AI to capture, organize, and connect ideas, transforming raw thoughts into actionable insights. Placeholder for more details.",
    technologies: ['Python', 'Machine Learning', 'React', 'FastAPI'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'neural network',
    screenshots: [{ url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'insights dashboard', caption: 'Dashboard view' }],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'AI Application',
    status: 'active',
    tags: ['ai', 'knowledge', 'insights'],
    createdAt: '2024-04-10',
    updatedAt: '2024-07-15',
  },
  {
    id: 'dopevest',
    title: 'DoPeVest',
    icon: DoPeVestIcon,
    description: "A platform for smart and accessible investments.",
    longDescription: "DoPeVest aims to democratize investment opportunities by providing a user-friendly platform with intelligent tools for portfolio management. Placeholder for more details.",
    technologies: ['Fintech', 'Blockchain', 'Node.js', 'React'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'finance chart',
    screenshots: [{ url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'investment portfolio', caption: 'Portfolio overview' }],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Investment Platform',
    status: 'active',
    tags: ['investment', 'finance', 'crypto'],
    createdAt: '2024-03-15',
    updatedAt: '2024-07-10',
  },
  {
    id: 'malipay',
    title: 'MaliPay',
    icon: MaliPayIcon,
    description: "Seamless and secure payment solutions for emerging markets.",
    longDescription: "MaliPay focuses on providing accessible and secure digital payment infrastructure, catering to the unique needs of emerging economies. Placeholder for more details.",
    technologies: ['Mobile Payments', 'Security', 'API Integration', 'Flutter'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mobile payment',
    screenshots: [{ url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'transaction screen', caption: 'Payment interface' }],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Payment Solution',
    status: 'active',
    tags: ['payments', 'fintech', 'mobile'],
    createdAt: '2024-02-20',
    updatedAt: '2024-07-05',
  },
  {
    id: 'fitjourney',
    title: 'FitJourney',
    icon: FitJourneyIcon,
    description: "Tracking and motivating fitness goals for a healthier lifestyle.",
    longDescription: "FitJourney is a comprehensive fitness companion app designed to help users track their progress, set goals, and stay motivated on their path to a healthier life. Placeholder for more details.",
    technologies: ['React Native', 'Firebase', 'HealthKit', 'Google Fit'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'fitness tracker',
    screenshots: [{ url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'activity dashboard', caption: 'User dashboard' }],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Fitness Application',
    status: 'active',
    tags: ['fitness', 'health', 'mobile-app'],
    createdAt: '2024-01-25',
    updatedAt: '2024-06-30',
  },
  {
    id: 'streampulse',
    title: 'StreamPulse',
    icon: StreamPulseIcon,
    description: "Analytics platform for live streaming content creators (Archived).",
    longDescription: "StreamPulse provided real-time analytics and insights for live streamers to understand their audience and optimize content (Archived). Placeholder for more details.",
    technologies: ['Data Analytics', 'Streaming API', 'Vue.js', 'Chart.js'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'streaming dashboard',
    screenshots: [{ url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'analytics graph', caption: 'Archived dashboard' }],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Analytics Tool',
    status: 'archived',
    tags: ['streaming', 'analytics', 'archived'],
    createdAt: '2023-01-10',
    updatedAt: '2023-12-01',
  },
  {
    id: 'malawi-market-connect',
    title: 'Malawi Market Connect',
    icon: MalawiMarketConnectIcon,
    description: "Connecting local Malawian producers with broader markets (Archived).",
    longDescription: "This platform aimed to bridge the gap between local producers in Malawi and wider markets, facilitating trade and economic growth (Archived). Placeholder for more details.",
    technologies: ['E-commerce', 'Logistics', 'PHP', 'MySQL'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'market produce',
    screenshots: [{ url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'product listing', caption: 'Archived marketplace' }],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Marketplace',
    status: 'archived',
    tags: ['e-commerce', 'africa', 'archived'],
    createdAt: '2022-11-01',
    updatedAt: '2023-10-01',
  },
  {
    id: 'melodyshare',
    title: 'MelodyShare',
    icon: MelodyShareIcon,
    description: "A platform for sharing and discovering new music (Archived).",
    longDescription: "MelodyShare was a social music platform allowing users to share their favorite tracks and discover new music through community recommendations (Archived). Placeholder for more details.",
    technologies: ['Audio Streaming', 'Social Features', 'Ruby on Rails', 'PostgreSQL'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'music notes',
    screenshots: [{ url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'song feed', caption: 'Archived music feed' }],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Music Platform',
    status: 'archived',
    tags: ['music', 'social', 'archived'],
    createdAt: '2022-09-15',
    updatedAt: '2023-08-01',
  },
  {
    id: 'collabinvest',
    title: 'CollabInvest',
    icon: CollabInvestIcon,
    description: "Collaborative investment and portfolio management tool (Archived).",
    longDescription: "CollabInvest enabled groups to pool funds and manage investments collectively, providing tools for decision-making and tracking (Archived). Placeholder for more details.",
    technologies: ['Fintech', 'Collaboration Tools', 'Django', 'React'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'team collaboration',
    screenshots: [{ url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'group portfolio', caption: 'Archived investment dashboard' }],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Investment Tool',
    status: 'archived',
    tags: ['investment', 'collaboration', 'archived'],
    createdAt: '2022-07-01',
    updatedAt: '2023-06-01',
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
        thumbnailUrl: 'https://placehold.co/300x200.png',
        hint: 'music player',
        caption: 'Main Player Interface with Waveform Visualization'
      },
      {
        url: 'https://placehold.co/1280x720.png',
        thumbnailUrl: 'https://placehold.co/300x200.png',
        hint: 'analytics dashboard',
        caption: 'Artist Analytics Dashboard with Earnings Breakdown'
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
        thumbnailUrl: 'https://placehold.co/300x200.png',
        hint: 'chat interface',
        caption: 'Secure Messaging with Translation Options'
      },
      {
        url: 'https://placehold.co/1280x720.png',
        thumbnailUrl: 'https://placehold.co/300x200.png',
        hint: 'event feed',
        caption: 'Community Feed with Upcoming Events'
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
        thumbnailUrl: 'https://placehold.co/300x200.png',
        hint: 'download config',
        caption: 'Download Configuration with Quality Options'
      },
      {
        url: 'https://placehold.co/1280x720.png',
        thumbnailUrl: 'https://placehold.co/300x200.png',
        hint: 'file browser',
        caption: 'Organized Downloads by Channel and Date'
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
      { url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'user profile', caption: 'User Profile & Verification' },
      { url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'referral tracking', caption: 'Referral Status Dashboard' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Web Platform',
    status: 'active',
    createdAt: '2022-05-10',
    updatedAt: '2023-01-20',
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
      { url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'photo showcase', caption: 'Main Gallery View' },
      { url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'image details', caption: 'EXIF Data Display' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Photography Portfolio',
    status: 'active',
    createdAt: '2021-10-01',
    updatedAt: '2022-08-15',
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
      { url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'donor management', caption: 'Donor Management Interface' },
      { url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'campaign stats', caption: 'Campaign Impact Analytics' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Web Platform',
    status: 'active',
    createdAt: '2022-01-20',
    updatedAt: '2022-12-05',
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
      { url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'data import', caption: 'Data Import Screen' },
      { url: 'https://placehold.co/1280x720.png', thumbnailUrl: 'https://placehold.co/300x200.png', hint: 'analysis results', caption: 'Follower Analysis Results' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Utility Tool',
    status: 'active',
    createdAt: '2021-08-10',
    updatedAt: '2022-04-01',
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
