/**
 * Generates the srcset string for a given array of images.
 */
export const generateSrcset = (images: formatImages): string | undefined => {
  const entries = Object.entries(images).filter(([key]) => key !== "default");
  if (entries.length === 0) return undefined;

  return entries.map(([key, image]) => `${image.src} ${key}`).join(",");
}
