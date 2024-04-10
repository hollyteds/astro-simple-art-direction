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
declare type objectPosition = 
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | `${number}${unit}`
  | `${number} ${number}`
  | `${number}${unit} ${number}${unit}`
  | `${"top" | "bottom"} ${number}${unit} ${"left" | "right"} ${number}${unit}`

/**
 * Represents the src interface.
 */
declare interface src {
  file: string;
  width: width;
  height: height;
};

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

/**
 * For the 'size' prop of the backgroundPicture.
 */
declare type unit = 'px' | '%' | 'em' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax' | 'svw' | 'svh' | 'lvw' | 'lvh' | 'dvw' | 'dvh';
declare type LengthUnit = `${number}${unit}`;
declare type sizeLength = LengthUnit | 'auto';