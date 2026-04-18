import { getImage } from "astro:assets";

/**
 * Generates formatted images based on the provided image, format, and source dimensions.
 */
export const getFormatImages = async (
  image: ImageMetadata,
  format: format,
  width: width,
  widths?: number[]
) => {

  // Initial declaration of the return value.
  const imagesByWidth: formatImages = {};

  // Convert environment variable to the number
  const envNumber: number = Number(import.meta.env.MAX_RESOLUTION_MULTIPLIER);
  
  // A constant defining the maximum multiplier for the output resolution.
  const maxResolutionMultiplier: number = envNumber && envNumber >= 1 && envNumber < 5 ? Math.floor(envNumber) : 2;

  // Retrieve the size array from environment variables if available; otherwise, use default values.
  const listOfWidths: number[] = widths ? [...widths] : (() => {
    const result = [];
    for (let i = 1; i <= maxResolutionMultiplier; i++) {
      result.push(width * i);
    }
    return result;
  })();

  // Ensure the fallback width is always present even when a custom widths list is passed.
  if (!listOfWidths.includes(width)) listOfWidths.push(width);

  // Generate the default image.
  imagesByWidth['default'] = await getImage({
    src: image,
    format: format,
    width: width
  });

  if (maxResolutionMultiplier === 1 && ( !widths || widths.length === 0 ) ) return imagesByWidth;

  let isMaxSize = false;
  for (let i = 0; i < listOfWidths.length; i++) {

    // Check if the current width from the list exceeds the allowed maximum resolution.
    if ( listOfWidths[i] > width * maxResolutionMultiplier) isMaxSize = true;
    
    // Defining the generate size: if the maximum size, use the maximum resolution; otherwise, use the current size from the list.
    let generateSize = isMaxSize ? width * maxResolutionMultiplier : listOfWidths[i];

    // Reuse the default image when the generated width equals the fallback width.
    if (generateSize === width) {
      imagesByWidth[`${generateSize}w`] = imagesByWidth.default;
      continue;
    }

    // Generate the image with the determined width and add it to the formatImages object.
    imagesByWidth[`${generateSize}w`] = await getImage({
      src: image,
      format: format,
      width: generateSize
    });

    // Exit the loop if the maximum allowable resolution has been reached.
    if (isMaxSize) break;
  }
  return imagesByWidth;
}
