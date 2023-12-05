import type { GetImageResult } from "astro";
import { getImage } from "astro:assets";

/**
 * Get format images based on the provided image, format, and source dimensions.
 * @param {object} image - The image object.
 * @param {string} format - The desired format of the images.
 * @param {number} width - Width of the image
 * @returns An array of format images.
 */
export const getFormatImages: Function = async (
  image: ImageMetadata,
  format: string,
  width: number,
) => {
  const maxResolutionMultiplier = 2
  let defaultFormat: GetImageResult[] = [];
  for ( let i = 1; i <= maxResolutionMultiplier; i++) {
    defaultFormat[i] = await getImage({ src: image, format: format, width: width * i });
  }
  return defaultFormat;
}