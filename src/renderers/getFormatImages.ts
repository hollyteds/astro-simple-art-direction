import type { GetImageResult } from "astro";
import { getImage } from "astro:assets";

/**
 * Get format images based on the provided image, format, and source dimensions.
 * @param {object} image - The image object.
 * @param {string} format - The desired format of the images.
 * @param {number} width - Width of the image
 * @returns {object}An array of format images.
 */
export const getFormatImages: Function = async (
  image: ImageMetadata,
  format: string,
  width: number,
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