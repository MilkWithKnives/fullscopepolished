// lib/portfolio.ts
// Central list of portfolio media coming from /public/Towebsite/... paths.
// Add/remove items here and the gallery updates automatically.
//
// HYBRID SUPPORT: Now supports both local images (/Towebsite/...) and Cloudinary images
// - Local images: Keep using /Towebsite/... paths (existing images continue working)
// - Cloudinary images: Use Cloudinary public IDs (e.g., 'portfolio/new-exterior-1')

import { getOptimizedImageUrl } from './cloudinary';

export type PhotoItem = {
  src: string;        // /Towebsite/... path (local) OR Cloudinary public ID
  alt: string;
  w?: number;         // optional intrinsic width (for better CLS)
  h?: number;         // optional intrinsic height (for better CLS)
  tag?: 'interior' | 'exterior' | 'commercial' | 'detail';
  cloudinary?: boolean; // optional: explicitly mark as Cloudinary (auto-detected if not provided)
};

// Helper function to get optimized image URL (works with both local and Cloudinary)
export function getPhotoUrl(item: PhotoItem, width?: number, height?: number): string {
  return getOptimizedImageUrl(item.src, { width, height });
}

export const PHOTOS: PhotoItem[] = [
  // === Your 5 confirmed assets ===
  {
    src: '/Towebsite/exterior/Exterior4.jpeg',
    alt: 'Exterior – curb appeal',
    tag: 'exterior',
    w: 1600,
    h: 1067,
  },
  {
    src: '/Towebsite/interior/Interior34.jpg',
    alt: 'Interior – living area',
    tag: 'interior',
    w: 1600,
    h: 1067,
  },
  {
    src: '/Towebsite/interior/Interior22.jpg',
    alt: 'Interior – kitchen detail',
    tag: 'interior',
    w: 1600,
    h: 1067,
  },
  {
    src: '/Towebsite/commercial/commercial14.jpg',
    alt: 'Commercial space',
    tag: 'commercial',
    w: 1600,
    h: 1067,
  },
  // You can include a poster still for videos here too if you want them in photos:
  // { src: '/Towebsite/video/Video3-poster.jpg', alt: 'Video poster frame', tag: 'detail', w: 1600, h: 900 },

  // === Add more of your images below this line ===
  // Local images (continue using /Towebsite/... paths):
  // { src: '/Towebsite/exterior/Exterior5.jpeg', alt: 'Exterior', tag: 'exterior', w: 1600, h: 1067 },
  // { src: '/Towebsite/interior/Interior18.jpg', alt: 'Interior', tag: 'interior', w: 1600, h: 1067 },

  // NEW: Cloudinary images (use public ID, automatic optimization):
  // { src: 'portfolio/new-exterior-1', alt: 'New exterior photo', tag: 'exterior', w: 1600, h: 1067 },
  // { src: 'portfolio/new-interior-1', alt: 'New interior photo', tag: 'interior', w: 1600, h: 1067 },
];

export const PHOTO_TAGS = ['all', 'interior', 'exterior', 'commercial', 'detail'] as const;
export type PhotoTag = typeof PHOTO_TAGS[number];

// Legacy export surface for existing imports
export const photos = PHOTOS;
