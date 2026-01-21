import { isImageMetadata } from '../typeGuard.ts';
import { getFormatImages } from "./getFormatImages";

const images = import.meta.glob(`/src/**/*`);
// Use URL imports for SVG so we can always output a plain <img> src.
const svgUrls = import.meta.glob(`/src/**/*.svg`, { query: '?url', import: 'default' });

/**
 * Retrieves the image asset based on the provided source and formats.
 */

export const getImageAsset = async (
  src: src,
  formats: format[],
  widths?: number[]
): Promise<assets | undefined> => {
  const { file, width, height } = src;

  // Convert the DEFAULT_IMAGE_DIRECTORY environment variable.
  const envDirectoryName: string | undefined = import.meta.env.DEFAULT_IMAGE_DIRECTORY;

  // If envDirectoryName is truthy, use it. Otherwise, default to 'images'.
  const imageDirectory: string = envDirectoryName ?? "images";

  // Refer to environment variables
  const envFormat: format | undefined = import.meta.env.FALLBACK_FORMAT;

  const isSvgFile = file.toLowerCase().endsWith('.svg');
  const imagePath = `/src/${imageDirectory}/${file}`;
  const loader = images[imagePath];
  if (!loader) throw new Error(`${imageDirectory}/${file} is not found.`);

  // Handle SVG separately because Astro may return a component, not ImageMetadata.
  if (isSvgFile) {
    const svgUrlLoader = svgUrls[imagePath];
    if (svgUrlLoader) {
      const svgSrc = await svgUrlLoader();
      const svgImage = {
        src: svgSrc,
        width,
        height,
        format: 'svg',
      } as ImageMetadata;

      return {
        attributes: {
          width: width,
          height: height,
          sizes: `(max-width: ${width}px) 100vw, ${width}px`,
        },
        defaultFormat: 'svg',
        svg: { default: svgImage },
      };
    }
  }

  const target: unknown = await loader();
  if (isImageMetadata(target)) {
    const image: ImageMetadata = target.default;

    const isSvg: boolean = image.format === "svg";

    // Initialize the assets object with default attributes and format information.
    const assets: assets = {
      attributes: {
        width: width,
        height: height,
        sizes: `(max-width: ${width}px) 100vw, ${width}px`,
      },
      defaultFormat: (!isSvg && envFormat) ? envFormat : image.format,

      // Format of the original image other than SVG (but if FALLBACK_FORMAT is specified, it is not processed here as it will be optimised together later).
      ...(!isSvg && !envFormat ? {
        [image.format]: await getFormatImages(image, image.format, width, widths)
      } : {}),
      // For SVG format, directly assign the path to the 'default' key without modification.
      ...(isSvg && { svg: { default: image } }),
    };

    // Output all specified image formats.
    if (!isSvg && formats) {
      for (const format of formats) {
        if (format === 'svg') continue;
        assets[format] = await getFormatImages(image, format, width, widths);
      }
    }

    return assets;
  }
};
