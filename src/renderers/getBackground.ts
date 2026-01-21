import { isImageMetadata } from '../typeGuard.ts';
import { getImage } from "astro:assets";

const images = import.meta.glob(`/src/**/*`);

/**
 * This function retrieves the background of an image.
 */
export const getBackground = async (
  src: {
    file: string,
    width?: width,
    height?: number
  },
  format?: format
) => {
  const { file, width, height } = src;

  // Refer to environment variables
  const envFormat: format | undefined = import.meta.env.FALLBACK_FORMAT;
  
  // Convert the DEFAULT_IMAGE_DIRECTORY environment variable.
  const envDirectoryName: string | undefined = import.meta.env.DEFAULT_IMAGE_DIRECTORY;

  // If envDirectoryName is truthy, use it. Otherwise, default to 'images'.
  const imageDirectory: string = envDirectoryName ? envDirectoryName : 'images';

  const imagePath = `/src/${imageDirectory}/${file}`;
  const loader = images[imagePath];
  if (!loader) throw new Error(`${imageDirectory}/${file} is not found.`);

  const target: unknown = await loader();

  if (isImageMetadata(target)) {
    const targetImage: ImageMetadata = target.default

    const image = await getImage({
      src: targetImage,
      width: width,
      height: height,
      format: format ?? envFormat ?? targetImage.format
    });

    return image.src;
  }

  // File is not found.
  throw new Error(`${imageDirectory}/${file} is not found.`);

}
