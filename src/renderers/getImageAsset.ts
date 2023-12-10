import { getFormatImages } from "./getFormatImages";

/**
 * Retrieves the image asset based on the provided source and formats.
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