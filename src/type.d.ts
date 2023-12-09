/**
 * Represents the available image formats.
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
 * Represents the available HTML tag names.
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
 * Represents the available decoding options.
 */
declare type decoding = 'async' | 'auto' | 'sync' | undefined | null;

/**
 * Represents the available fetch priority options.
 */
declare type fetchpriority = 'auto' | 'high' | 'low' | undefined | null;

/**
 * Represents the available loading options.
 */
declare type loading = 'eager' | 'lazy' | undefined | null;

/**
 * Represents the available width options.
 */
declare type width = number | string | undefined | null;

/**
 * Represents the available height options.
 */
declare type height = number | string | undefined | null;

/**
 * Represents the available object fit options.
 */
declare type objectFit = 
  | 'fill'
  | 'contain'
  | 'cover'
  | 'none'
  | 'scale-down'
  | null

/**
 * Represents the src interface.
 */
declare interface src {
  file: string;
  width: width;
  height: height;
};

/**
 * Represents the artDirective interface.
 */
declare interface artDirective extends src {
  media: string;
};

/**
 * Represents the assets interface.
 */
declare interface assets {
  isSvg: boolean;
  width: width;
  height?: height;
  sizes: string;
  defaultFormat: GetImageResult;
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