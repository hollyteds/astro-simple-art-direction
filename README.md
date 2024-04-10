# **astro-simple-art-direction**

This component utilizes the **`getImage`** function from **`astro:assets`** to generate optimized images from the src directory and implements a simple art direction.

By specifying the file, width, and height in the **`src`** object, it outputs responsive images and art direction.

## Install

```bash
npm install astro-simple-art-direction
```

## Chenge log

### 1.0.1

- Addition of two environment variables.

  - [FALLBACK_FORMAT](###FALLBACK_FORMAT) 
  - [DEFAULT_GENERATE_FORMAT](###DEFAULT_GENERATE_FORMAT)

- Add `position` parameter to [BackgroundPicture](/component-BackgroundPicture.md) component.

### 1.0.0

- release

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

This environment variable determines the range of sizes to output in the srcset attribute, based on the width and height, ranging from 1x to a defined maximum.
For example, if defined to 4, it will output four images at 1x, 2x, 3x, and 4x resolutions. The default value is 2.

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

**Type:** `(| "heic" | "heif" | "avif" | "jpg" | "jpeg" | "png" | "tiff" | "webp" | "gif" | "SVG" )[]`;

This environment variable specifies the output format of the images used in the project as an array. There must be a space between words.

> [!NOTE]
> If the environment variable FALLBACK_FORMAT is defined, the DEFAULT_GENERATE_FORMAT array must contain the image format defined there.

