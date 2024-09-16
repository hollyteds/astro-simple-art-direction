/**
 * Image formats available.
 */
declare type format =
  | 'heic'
  | 'heif'
  | 'avif'
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'tiff'
  | 'webp'
  | 'gif'
  | 'svg'

  /**
   * Image formats available as fallback.
   */
  declare type fallbackFormat =
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'webp'
  | 'gif'

/**
 * Available HTML tag.
 */
declare type tagName =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "main"
  | "aside"
  | "nav"
  | "figure"
  | "blockquote"
  | "q"
  | "cite"
  | "a"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "ul"
  | "ol"
  | "li"
  | "dl"
  | "dt"
  | "dd";

/**
 * For the 'size' prop of the backgroundPicture.
 */
declare type unit = 'px' | '%' | 'em' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax' | 'svw' | 'svh' | 'lvw' | 'lvh' | 'dvw' | 'dvh';
declare type LengthUnit = `${number}${unit}`;
declare type sizeLength = LengthUnit | 'auto';

/**
 * Available decoding options.
 */
declare type decoding = 'async' | 'auto' | 'sync' | undefined | null;

/**
 * Available fetch priority options.
 */
declare type fetchpriority = 'auto' | 'high' | 'low' | undefined | null;

/**
 * Available loading options.
 */
declare type loading = 'eager' | 'lazy' | undefined | null;

/**
 * Available width options.
 */
declare type width = number;

/**
 * Available height options.
 */
declare type height = number;

/**
 * Available object fit options.
 */
declare type objectFit = 
  | 'fill'
  | 'contain'
  | 'cover'
  | 'none'
  | 'scale-down'

/**
 * Available object position options.
 */
type simplePosition = 
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

type numberUnit = `${number}${string}`;
type twoNumbers = `${number} ${number}`;
type twoNumberUnits = `${number}${string} ${number}${string}`;
type complexPosition = `${"top" | "bottom"} ${number}${string} ${"left" | "right"} ${number}${string}`;

/**
 * Represents the type for object position.
 * It can be one of the following:
 * - simplePosition
 * - numberUnit
 * - twoNumbers
 * - twoNumberUnits
 * - complexPosition
 */
declare type objectPosition = 
  | simplePosition
  | numberUnit
  | twoNumbers
  | twoNumberUnits
  | complexPosition;

/**
 * Represents the src interface.
 */
declare interface src {
  file: string;
  width: width;
  height: height;
  widths?: number[];
  sizes?: string;
};

declare interface picture {
  style?: string;
  src: src;
  artDirectives?: artDirective[];
  alt?: string;
  loading?: loading;
  class?: string;
  decoding?: decoding;
  formats?: format[];
}

/**
 * Represents the image elements attributes.
 */
declare interface imageAttributes {
  src?: string;
  srcset?: string;
  sizes?: string;
  width: width;
  height: height;
  media?: string;
  type?: string;
};

/**
 * ArtDirective interface.
 */
declare interface artDirective extends src {
  media: string;
};

/**
 * Assets interface.
 */
declare interface assets {
  attributes: imageAttributes;
  defaultFormat: format;
  heic?: GetImageResult,
  heif?: GetImageResult,
  avif?: GetImageResult,
  jpg?: GetImageResult,
  jpeg?: GetImageResult,
  png?: GetImageResult,
  tiff?: GetImageResult,
  webp?: GetImageResult,
  gif?: GetImageResult,
  svg?: GetImageResult
}
