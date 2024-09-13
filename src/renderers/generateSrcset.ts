/**
 * Generates the srcset string for a given array of images.
 */
export const generateSrcset = (images: { [key: string]: ImageMetadata }) => {
  
  let srcset: string = '';

  Object.keys(images).forEach(key => {
    if(key !== "default" ) srcset += images[key].src + ` ${key},`;
  })

  return srcset.slice(0, -1);
  
}