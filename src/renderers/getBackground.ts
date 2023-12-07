import { getImage } from "astro:assets";

/**
 * This function retrieves the background of an image.
 * 
 * @param {any} src - The source of the image.
 * @param {string} format - The format of the image.
 * @returns {string} The URL of the image.
 */
export const getBackground: Function = async (
  src: {
    file: string,
    width?: number,
    height?: number
  },
  format: string
) => {
  const { file, width, height } = src;

  // Convert the DEFAULT_IMAGE_DIRECTORY environment variable.
  const envDirectoryName:string = await import.meta.env.DEFAULT_IMAGE_DIRECTORY;

  // If envDirectoryName is truthy, use it. Otherwise, default to 'images'.
  const imageDirectory: string = envDirectoryName ? envDirectoryName : 'images';

  const images = import.meta.glob(`/src/**/*`);
  const target: any = await images[`/src/${imageDirectory}/${file}`]();

  const targetImage: ImageMetadata  = target.default

	const image = await getImage({ src: targetImage, width: width, height: height, format: format });
	return image.src;
}