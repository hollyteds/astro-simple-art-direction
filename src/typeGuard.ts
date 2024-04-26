// isImageMetadata
export const isImageMetadata = (obj: unknown): obj is { default: ImageMetadata } => {
  return !!obj && typeof obj === 'object' && 'default' in obj;
}