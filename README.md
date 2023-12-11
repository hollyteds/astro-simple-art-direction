# **astro-simple-art-direction**

This component utilizes the **`getImage`** function from **`astro:assets`** to generate optimized images from the src directory and implements a simple art direction.

By specifying the file, width, and height in the **`src`** object, it outputs responsive images and art direction.

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

This variable determines the range of sizes to output in the srcset attribute, based on the width and height, ranging from 1x to a specified maximum.
For example, if set to 4, it will output four images at 1x, 2x, 3x, and 4x resolutions. The default value is 2.