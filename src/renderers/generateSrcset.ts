/**
 * Generates the srcset string for a given array of images.
 */
export const generateSrcset = (images: ImageMetadata[]) => {
  
  let srcset: string = '';

  for( let i = 1; i<images.length; i++ ) {
    srcset += images[i].src + ' ' + i+'x,'; 
  }
  return srcset.slice(0, -1);
  
}