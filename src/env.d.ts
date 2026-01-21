/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DEFAULT_IMAGE_DIRECTORY?: string;
  readonly MAX_RESOLUTION_MULTIPLIER?: string;
  readonly FALLBACK_FORMAT?: fallbackFormat;
  readonly DEFAULT_GENERATE_FORMAT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
