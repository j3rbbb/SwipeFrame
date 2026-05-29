import type { Carousel } from '@/types';

export const platformDimensions: Record<
  Carousel['platform'],
  { width: number; height: number }
> = {
  instagram: { width: 1080, height: 1350 },
  linkedin: { width: 1080, height: 1350 },
  twitter: { width: 1200, height: 675 },
  custom: { width: 1080, height: 1350 },
};

export function getPlatformDimensions(platform: Carousel['platform']) {
  return platformDimensions[platform] ?? platformDimensions.instagram;
}
