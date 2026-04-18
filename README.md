# **astro-simple-art-direction**

This component utilizes the **`getImage`** function from **`astro:assets`** to generate optimized images from the src directory and implements a simple art direction.

By specifying the file, width, and height in the **`src`** object, it outputs responsive images and art direction.

Compatibility: Astro 4.x, 5.x and 6.x (tested on 6.1.8).

## Install

```bash
npm install astro-simple-art-direction
```

## Components

- [Picture Component](/component-Picture.md)

- [BackgroundImage Component](/component-BackgroundImage.md)

- [BackgroundPicture Component](/component-BackgroundPicture.md)

## Environment

You can set the following environment variables in the `.env` file created at the root of the project.

### DEFAULT_IMAGE_DIRECTORY

```bash
DEFAULT_IMAGE_DIRECTORY=assets # default : images
```

The image files to be optimized default to referencing the "images" directory within the "src" directory.
By assigning a directory name to this variable, you can change the reference location for the images.

### MAX_RESOLUTION_MULTIPLIER

```bash
MAX_RESOLUTION_MULTIPLIER=4 # default : 2
```

This environment variable determines the range of sizes to output in the srcset attribute based on the width and height.
The output is up to the specified maximum multiplier. The default value is 2.
The value must be an integer between 1 and 4. Decimal points will be truncated.

### FALLBACK_FORMAT

```bash
FALLBACK_FORMAT=webp # default : undefined
```

**Type:** `"jpg" | "jpeg" | "png" | "webp" | "gif"`;

This environment variable defines the image format to be output as fallback. If undefined, the original image format is retained.

### DEFAULT_GENERATE_FORMAT

```bash
DEFAULT_GENERATE_FORMAT=avif webp # default : avif webp
```

**Type:** `(| "heic" | "heif" | "avif" | "jpg" | "jpeg" | "png" | "tiff" | "webp" | "gif" | "svg" )[]`;

This environment variable specifies the output format of the images used in the project as an array. There must be a space between words.

Invalid entries are ignored. The `svg` format is not generated as a raster source.

> [!NOTE]
> If the environment variable FALLBACK_FORMAT is defined, the DEFAULT_GENERATE_FORMAT array must contain the image format defined there.

## Chenge log

### 1.1.1

- Add support range for Astro 6.x.
- Fix MIME type output for `jpg` sources (`image/jpeg`).
- Preserve user-defined inline styles in `BackgroundImage` and `BackgroundPicture`.

### 1.1.0

- Output a standalone `img` when no art direction or format fallbacks are needed.
- Support Astro 4.0 to 5.x (peer dependency range updated).
- Ignore invalid values in DEFAULT_GENERATE_FORMAT; svg is excluded from generated sources.
- Improve compatibility with Astro 4.0 typings for background components.

### 1.0.8

- The sizes attribute can now be specified.

### 1.0.7

- Replaced the output sizes of the srcset attribute from resolution units to width units.

### 1.0.6

- Bug fix.

### 1.0.5

- Fixed type definition issues and adjusted the output position of CSS properties.

### 1.0.4

- BackgroundPicture property adjustments and removal of extra CSS variables.

### 1.0.3

- Added error handling and fine-tuning of type definitions.

### 1.0.2

- Added operator for undefined avoidance.

### 1.0.1

- Addition of two environment variables.

  - [FALLBACK_FORMAT](#FALLBACK_FORMAT) 
  - [DEFAULT_GENERATE_FORMAT](#DEFAULT_GENERATE_FORMAT)

- Add `position` parameter to [BackgroundPicture](/component-BackgroundPicture.md) component.

### 1.0.0

- release
