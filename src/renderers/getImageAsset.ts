import { isImageMetadata } from '../typeGuard.ts';
import { getFormatImages } from "./getFormatImages";

/**
 * Retrieves the image asset based on the provided source and formats.
 */

export const getImageAsset: Function = async (src: src, formats: format[]) => {
  const { file, width, height } = src;

  // Convert the DEFAULT_IMAGE_DIRECTORY environment variable.
  const envDirectoryName: string = await import.meta.env.DEFAULT_IMAGE_DIRECTORY;

  // If envDirectoryName is truthy, use it. Otherwise, default to 'images'.
  const imageDirectory: string = envDirectoryName ?? "images";

  // Refer to environment variables
  const envFormat: format = await import.meta.env.FALLBACK_FORMAT;

  // Throws an error if the environment variable FALLBACK_FORMAT is not included in the array of image formats to be generated.
  if (envFormat && formats.indexOf(envFormat) < 0) {
    throw new Error('The value of the environment variable FALLBACK_FORMAT must be included in the output image format array.');
  }

  const images = import.meta.glob(`/src/**/*`);

  try {
    const target: unknown = await images[`/src/${imageDirectory}/${file}`]();

    if (isImageMetadata(target)) {
      const image: ImageMetadata = target.default;

      const isSvg: boolean = image.format === "svg";

      let assets: assets = {
        attributes: {
          width: width,
          height: height,
          sizes: `(max-width: ${width}px) 100vw, ${width}px`,
        },
        defaultFormat: (!isSvg && envFormat) ? envFormat : image.format,

        // Format of the original image other than SVG (but if FALLBACK_FORMAT is specified, it is not processed here as it will be optimised together later).
        ...( !isSvg && !envFormat ? {
          [image.format]: await getFormatImages(image, image.format, width)
        } : {}),
        // SVG format returns the path as is. Index 0 is skipped on output, so apply 1.
        ...(isSvg && { svg: { [1]: image } }),
      };

      // Output all specified image formats.
      if (!isSvg && formats) {
        for (const format of formats) {
          assets[format] = await getFormatImages(image, format, width);
        }
      }

      return assets;
    }
    
  } catch (error) {
    // File is not found.
    throw new Error(`${imageDirectory}/${file} is not found.`);
  }
};