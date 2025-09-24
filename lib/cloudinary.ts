// lib/cloudinary.ts
// Utility functions for Cloudinary image handling
// This file enables hybrid support: local images continue working as-is,
// while new images can optionally use Cloudinary for optimization.

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export type CloudinaryTransformOptions = {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb';
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
};

/**
 * Detects if a URL is a Cloudinary image
 */
export function isCloudinaryUrl(src: string): boolean {
  return src.includes('cloudinary.com') || src.startsWith('cloudinary://');
}

/**
 * Detects if a URL is a local image (starts with /)
 */
export function isLocalUrl(src: string): boolean {
  return src.startsWith('/');
}

/**
 * Generates a Cloudinary URL for an image with optional transformations
 * @param publicId - The public ID of the image in Cloudinary (e.g., 'portfolio/exterior-1')
 * @param options - Transformation options
 */
export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME not configured');
    return publicId; // fallback to original
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = options;

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop && (width || height)) transformations.push(`c_${crop}`);
  if (gravity && crop === 'fill') transformations.push(`g_${gravity}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  const transformString = transformations.length > 0
    ? `/${transformations.join(',')}`
    : '';

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload${transformString}/${publicId}`;
}

/**
 * Universal image URL helper - works with both local and Cloudinary images
 * Automatically applies optimizations to Cloudinary images while leaving local images unchanged
 */
export function getOptimizedImageUrl(
  src: string,
  options: CloudinaryTransformOptions = {}
): string {
  // If it's a local image (existing /Towebsite/... images), return as-is
  if (isLocalUrl(src)) {
    return src;
  }

  // If it's already a full Cloudinary URL, return as-is
  if (isCloudinaryUrl(src) && src.startsWith('https://')) {
    return src;
  }

  // If it looks like a Cloudinary public ID, generate the URL
  return getCloudinaryUrl(src, options);
}

/**
 * Responsive image sizes helper for Cloudinary images
 * Generates multiple sizes for responsive images
 */
export function getResponsiveCloudinaryUrls(
  publicId: string,
  sizes: number[] = [400, 800, 1200, 1600],
  options: Omit<CloudinaryTransformOptions, 'width'> = {}
): { src: string; width: number }[] {
  return sizes.map(width => ({
    src: getCloudinaryUrl(publicId, { ...options, width }),
    width
  }));
}