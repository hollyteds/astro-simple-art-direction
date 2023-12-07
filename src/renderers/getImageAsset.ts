import { getFormatImages } from "./getFormatImages";

/**
 * Retrieves the image asset based on the provided source and formats.
 * @param {object} src - The source of the image asset.
 * @param {array} formats - The desired formats for the image asset. Defaults to ['avif', 'webp'].
 * @returns {object} assets - The image asset with various formats and properties.
 * @returns {boolean} assets.isSvg - A boolean indicating whether the image is in SVG format.
 * @returns {number} assets.width - The width of the image.
 * @returns {number} assets.height - The height of the image.
 * @returns {string} assets.sizes - A string representing the sizes attribute for responsive images.
 * @returns {object} assets.defaultFormat - An object containing the image in its default format.
 * @returns {object} assets[format] - An object containing the image in a specific format. This property is dynamically added for each format specified in the formats array. The value is the result of the getFormatImages function for the given format.
 */

export const getImageAsset: Function = async (
  src: src,
  formats : format[] = ['avif', 'webp']
) => {
  const { file, width, height } = src;

  // Convert the DEFAULT_IMAGE_DIRECTORY environment variable.
  const envDirectoryName:string = await import.meta.env.DEFAULT_IMAGE_DIRECTORY;

  // If envDirectoryName is truthy, use it. Otherwise, default to 'images'.
  const imageDirectory: string = envDirectoryName ? envDirectoryName : 'images';
  
  const images = import.meta.glob(`/src/**/*`);

  try {
    const target:any = await images[`/src/${imageDirectory}/${file}`]();
    const image: ImageMetadata = target.default;

    const isSvg: boolean = image.format === 'svg';

    let assets: assets = {
      isSvg: isSvg,
      width: width,
      height: height,
      sizes: `(max-width: ${width}px) 100vw, ${width}px`,
      defaultFormat: !isSvg ? await getFormatImages(image, image.format, width) : { [1]: image },
    }

    if ( !isSvg && formats ) {
      for (const format of formats) {
        assets[format] = await getFormatImages(image, format, width);
      }
    }

    return assets;
    
  } catch (error) {
    console.log(`${file} not found.`);
  }

};