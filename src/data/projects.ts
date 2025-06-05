
import type { Project } from '@/types';
// Import pre-rendered icon elements from the new .tsx file
import {
  DtunesIcon,
  DzalekaIcon,
  TelegramDownloaderIcon,
  LoopHireIcon,
  RebornPixelsIcon,
  WindowsOfHopeIcon,
  InstagramCheckerIcon
} from './project-icons';

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
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'music platform',
    screenshots: [
      { url: 'https://placehold.co/1280x720.png', hint: 'music player', caption: 'Main Player Interface' },
      { url: 'https://placehold.co/1280x720.png', hint: 'artist dashboard', caption: 'Artist Analytics Dashboard' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Web Platform',
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
      { url: 'https://placehold.co/1280x720.png', hint: 'chat interface', caption: 'Secure Messaging' },
      { url: 'https://placehold.co/1280x720.png', hint: 'community feed', caption: 'Community Feed & Events' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Social Platform',
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
    imageHint: 'downloader application',
    screenshots: [
      { url: 'https://placehold.co/1280x720.png', hint: 'download settings', caption: 'Download Configuration' },
      { url: 'https://placehold.co/1280x720.png', hint: 'file browser', caption: 'Organized Downloads' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Utility Tool',
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
      { url: 'https://placehold.co/1280x720.png', hint: 'user profile', caption: 'User Profile & Verification' },
      { url: 'https://placehold.co/1280x720.png', hint: 'referral tracking', caption: 'Referral Status Dashboard' },
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
      { url: 'https://placehold.co/1280x720.png', hint: 'photo showcase', caption: 'Main Gallery View' },
      { url: 'https://placehold.co/1280x720.png', hint: 'image details', caption: 'EXIF Data Display' },
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
      { url: 'https://placehold.co/1280x720.png', hint: 'donor management', caption: 'Donor Management Interface' },
      { url: 'https://placehold.co/1280x720.png', hint: 'campaign stats', caption: 'Campaign Impact Analytics' },
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
      { url: 'https://placehold.co/1280x720.png', hint: 'data import', caption: 'Data Import Screen' },
      { url: 'https://placehold.co/1280x720.png', hint: 'analysis results', caption: 'Follower Analysis Results' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Utility Tool',
  },
];
