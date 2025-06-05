import type { Project } from '@/types';

export const sampleProjects: Project[] = [
  {
    id: 'dtunes',
    title: 'dTunes',
    description: 'A decentralized music streaming platform empowering artists and listeners.',
    longDescription: 'dTunes is a conceptual music platform built with Next.js and Firebase, exploring decentralized content distribution. It features user authentication, music uploads, playlist creation, and a recommendation engine. The goal was to experiment with modern web technologies in the context of media streaming.',
    technologies: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'TypeScript'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'music platform interface',
    screenshots: [
      { url: 'https://placehold.co/1280x720.png', hint: 'music player screen', caption: 'Main Player Interface' },
      { url: 'https://placehold.co/1280x720.png', hint: 'artist profile page', caption: 'Artist Profile Page' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Web Development',
  },
  {
    id: 'dzaleka-online',
    title: 'Dzaleka Online',
    description: 'A community platform fostering connection and information sharing.',
    longDescription: 'Dzaleka Online is a community-focused platform designed to connect residents of Dzaleka Refugee Camp. It leverages React and WebSockets for real-time communication features like forums, event announcements, and resource sharing. The project emphasized user-centric design and accessibility.',
    technologies: ['React', 'Node.js', 'Express', 'WebSockets', 'MongoDB'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'community platform dashboard',
    screenshots: [
      { url: 'https://placehold.co/1280x720.png', hint: 'forum discussion thread', caption: 'Community Forum' },
      { url: 'https://placehold.co/1280x720.png', hint: 'event calendar view', caption: 'Events Calendar' },
    ],
    liveDemoUrl: '#',
    githubUrl: '#',
    category: 'Web Development',
  },
  {
    id: 'telegram-downloader',
    title: 'Telegram Media Downloader',
    description: 'A tool for efficiently downloading media from Telegram channels.',
    longDescription: 'This Python-based tool utilizes the Telegram API via GramJS (a Node.js library, assuming a conceptual pivot or wrapper for the description) to automate the download of media files from specified Telegram channels. It includes features for filtering by media type, date range, and managing download queues.',
    technologies: ['Python', 'Telegram API', 'GramJS (conceptual)', 'Asyncio'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'command line interface tool',
    category: 'Automation Tool',
  },
];
