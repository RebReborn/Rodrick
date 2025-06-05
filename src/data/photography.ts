export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  description?: string;
  aiHint?: string;
}

export const photographyData: Photo[] = [
  { id: '1', src: 'https://placehold.co/800x600.png', alt: 'Landscape 1', width: 800, height: 600, title: 'Mountain Serenity', description: 'A quiet morning in the alpines.', aiHint: 'mountain landscape' },
  { id: '2', src: 'https://placehold.co/600x800.png', alt: 'Portrait 1', width: 600, height: 800, title: 'Urban Explorer', description: 'Exploring the city streets.', aiHint: 'city street' },
  { id: '3', src: 'https://placehold.co/800x500.png', alt: 'Nature 1', width: 800, height: 500, title: 'Forest Path', description: 'Sunlight filtering through the trees.', aiHint: 'forest path' },
  { id: '4', src: 'https://placehold.co/700x700.png', alt: 'Abstract 1', width: 700, height: 700, title: 'Light & Shadow', description: 'An abstract play of light.', aiHint: 'abstract light' },
  { id: '5', src: 'https://placehold.co/900x600.png', alt: 'Wildlife 1', width: 900, height: 600, title: 'Coastal Bird', description: 'A bird taking flight near the coast.', aiHint: 'bird coast' },
  { id: '6', src: 'https://placehold.co/600x900.png', alt: 'Architecture 1', width: 600, height: 900, title: 'Modern Lines', description: 'Details of modern architecture.', aiHint: 'modern architecture' },
];
