// isImageMetadata
export const isImageMetadata = (obj: unknown): obj is { default: ImageMetadata } => {
  if (!obj || typeof obj !== 'object' || !('default' in obj)) return false;
  const maybeDefault = (obj as { default: unknown }).default;
  return !!maybeDefault
    && typeof maybeDefault === 'object'
    && 'src' in maybeDefault
    && 'width' in maybeDefault
    && 'height' in maybeDefault
    && 'format' in maybeDefault;
}
