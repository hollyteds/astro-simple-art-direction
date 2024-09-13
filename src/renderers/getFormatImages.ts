import type { GetImageResult } from "astro";
import { getImage } from "astro:assets";

/**
 * Generates formatted images based on the provided image, format, and source dimensions.
 */
export const getFormatImages = async (
  image: ImageMetadata,
  format: format,
  width: width,
) => {

  // Initial declaration of the return value.
  let formatImages: {
    [key: string]: GetImageResult;
  } = {};

  // Retrieve the size array from environment variables if available; otherwise, use default values.
  const envSizeList: number[] = await import.meta.env.INTRINSIC_SIZE_LIST?.split(' ') ?? [360, 720, 1440, 2880];

  // Convert environment variable to the number
  const envNumber: number = Number(await import.meta.env.MAX_RESOLUTION_MULTIPLIER);

  // A constant defining the maximum multiplier for the output resolution.
  const maxResolutionMultiplier: number = envNumber ? envNumber : 2;

  // If the maximum value is less than the product of the specified size and the maximum resolution multiplier, add the product to the list
  const maxListSize = envSizeList.reduce((max, current) => (current > max ? current : max), envSizeList[0]);
  if ( maxListSize < width * maxResolutionMultiplier ) {
    envSizeList.push(width * maxResolutionMultiplier);
  }

  // Generate the default image.
  formatImages['default'] = await getImage({
    src: image,
    format: format,
    width: width
  });

  let isMaxSize = false;
  for (let i = 0; i < envSizeList.length; i++) {

    // Check if the current width from the list exceeds the allowed maximum resolution.
    if (envSizeList[i] > width * maxResolutionMultiplier) isMaxSize = true;
    
    // Defining the generate size: if the maximum size, use the maximum resolution; otherwise, use the current size from the list.
    let generateSize = isMaxSize ? width * maxResolutionMultiplier : envSizeList[i];

    // Generate the image with the determined width and add it to the formatImages object.
    formatImages[`${generateSize}w`] = await getImage({
      src: image,
      format: format,
      width: generateSize
    });

    // Exit the loop if the maximum allowable resolution has been reached.
    if (isMaxSize) break;
  }
  return formatImages;
}