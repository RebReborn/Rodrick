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
  { id: '1', src: 'https://res.cloudinary.com/dq1hpdr7m/image/upload/v1744299393/full-image_k5fm4f.jpg', alt: 'Landscape 1', width: 800, height: 600, title: 'Mountain Serenity', description: 'A quiet morning in the alpines.', aiHint: 'mountain landscape' },
  { id: '2', src: 'https://res.cloudinary.com/dq1hpdr7m/image/upload/v1739479398/full-image_zdbufy.jpg', alt: 'Portrait 1', width: 600, height: 800, title: 'Urban Explorer', description: 'Exploring the city streets.', aiHint: 'city street' },
  { id: '3', src: 'https://res.cloudinary.com/dq1hpdr7m/image/upload/v1739479305/full-image_yaqwwj.jpg', alt: 'Nature 1', width: 800, height: 500, title: 'Forest Path', description: 'Sunlight filtering through the trees.', aiHint: 'forest path' },
  { id: '4', src: 'https://res.cloudinary.com/dq1hpdr7m/image/upload/v1739479265/full-image_kos5p9.jpg', alt: 'Abstract 1', width: 700, height: 700, title: 'Light & Shadow', description: 'An abstract play of light.', aiHint: 'abstract light' },
  { id: '5', src: 'https://res.cloudinary.com/dq1hpdr7m/image/upload/v1739479165/full-image_rbdihl.jpg', alt: 'Wildlife 1', width: 900, height: 600, title: 'Coastal Bird', description: 'A bird taking flight near the coast.', aiHint: 'bird coast' },
  { id: '6', src: 'https://res.cloudinary.com/dq1hpdr7m/image/upload/v1739479122/full-image_hfxua2.jpg', alt: 'Architecture 1', width: 600, height: 900, title: 'Modern Lines', description: 'Details of modern architecture.', aiHint: 'modern architecture' },
];
