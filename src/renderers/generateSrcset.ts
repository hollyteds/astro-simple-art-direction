/**
 * Generates the srcset string for a given array of images.
 * 
 * @param {array} images - An array of images object.
 * @returns {string} The srcset string.
 */
export const generateSrcset: Function = (images: ImageMetadata[]) => {
  
  let srcset: string = '';

  for( let i = 1; i<images.length; i++ ) {
    srcset += images[i].src + ' ' + i+'x,'; 
  }
  return srcset.slice(0, -1);
  
}