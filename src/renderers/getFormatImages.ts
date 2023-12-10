import type { GetImageResult } from "astro";
import { getImage } from "astro:assets";

/**
 * Get format images based on the provided image, format, and source dimensions.
 */
export const getFormatImages = async (
  image: ImageMetadata,
  format: string,
  width: width,
) => {
  
  // Convert environment variable to a number
  const envNumber:number = Number(await import.meta.env.MAX_RESOLUTION_MULTIPLIER);

  // A constant to determine the maximum multiplier for the output resolution.
  const maxResolutionMultiplier: number = envNumber ? envNumber : 2;

  let formatImages: GetImageResult[] = [];
  for ( let i = 1; i <= maxResolutionMultiplier; i++) {
    formatImages[i] = await getImage({ src: image, format: format, width: width * i });
  }
  return formatImages;
}