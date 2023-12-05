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
  | "dd"
  
declare type decoding =  'async' | 'auto' | 'sync' | undefined | null;
declare type fetchpriority = 'auto' | 'high' | 'low' | undefined | null;
declare type loading = 'eager' | 'lazy' | undefined | null;
declare type width = number | string | undefined | null;
declare type height = number | string | undefined | null;

declare type objectFit = 
  | 'fill'
  | 'contain'
  | 'cover'
  | 'none'
  | 'scale-down'
  | null


declare interface src { // Main image information
  file: string; // Image file path
  width: width; // Image width
  height: height; // Image height
};

declare interface artDirective extends src { // Image information for each media query
  media: string; // Media query
};

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
}
