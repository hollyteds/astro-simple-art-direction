import { getFormatImages } from "./getFormatImages";

/**
 * Retrieves the image asset based on the provided source and formats.
 * @param src - The source of the image asset.
 * @param formats - The desired formats for the image asset. Defaults to ['avif', 'webp'].
 * @returns The image asset with various formats and properties.
 */
export const getImageAsset: Function = async (
  src: src,
  formats : format[] = ['avif', 'webp']
) => {
  const { file, width } = src;
  const images = import.meta.glob('/src/images/**/*');

  try {
    const target:any = await images[`/src/images/${file}`]();
    const image: ImageMetadata = target.default;
    const isSvg : boolean = image.format === 'svg'

    let assets: assets = {
      isSvg: isSvg,
      width: width,
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