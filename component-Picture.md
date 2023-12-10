# **Picture**

This Astro component dynamically generates ```<picture/>``` elements for displaying images. Without any extra class name or style output, this component supports multiple image formats and media queries for responsive image display.

## **Usage**

This is the simplest method.

```tsx
import { Picture } from 'astro-simple-art-direction';

<Picture
  src={{
    file:"my-image.jpg",
    width:1000, 
    height: 800
  }} 
  alt="My image"
/>
```

```html
<!-- Output Results -->
<picture>
  <source srcset="./_astro/my-image.hash.avif 1x,./_astro/my-image.hash.avif 2x" sizes="(max-width: 1000px) 100vw, 1000px" type="image/avif">
  <source srcset="./_astro/my-image.hash.webp 1x,./_astro/my-image.hash.webp 2x" sizes="(max-width: 1000px) 100vw, 1000px" type="image/webp">
  <img width="1000" height="800" src="./_astro/my-image.hash.jpg" srcset="./_astro/my-image.hash.jpg 1x,./_astro/my-image.hash.jpg 2x" sizes="(max-width: 1000px) 100vw, 1000px" loading="lazy" decoding="auto" alt="My Image">
</picture>
```

This is the case of specifying art direction.

```tsx
<Picture
  src={{
    file:"my-image.jpg",
    width:1000, 
    height: 800
  }} 
  artDirectives={[
    {
      media:"(max-width: 767px)",
      file:"my-image-sp.jpg",
      width:400, 
      height: 400
    }
  ]}
  alt="My image"
/>
```

```html
<!-- Output Results -->
<picture>
  <source media="(max-width: 767px)" width="400" height="400" srcset="./_astro/my-image-sp.hash.avif 1x,./_astro/my-image-sp.hash.avif 2x" sizes="(max-width: 400px) 100vw, 400px" type="image/avif">
  <source media="(max-width: 767px)" width="400" height="400" srcset="./_astro/my-image-sp.hash.webp 1x,./_astro/my-image-sp.hash.webp 2x" sizes="(max-width: 400px) 100vw, 400px" type="image/webp">
  <source media="(max-width: 767px)" width="400" height="400" srcset="./_astro/my-image-sp.hash.jpg 1x,./_astro/my-image-sp.hash.jpg 2x" sizes="(max-width: 400px) 100vw, 400px">
  <source srcset="./_astro/my-image.hash.avif 1x,./_astro/my-image.hash.avif 2x" sizes="(max-width: 1000px) 100vw, 1000px" type="image/avif">
  <source srcset="./_astro/my-image.hash.webp 1x,./_astro/my-image.hash.webp 2x" sizes="(max-width: 1000px) 100vw, 1000px" type="image/webp">
  <img width="1000" height="800" src="./_astro/my-image.hash.jpg" srcset="./_astro/my-image.hash.jpg 1x,./_astro/my-image.hash.jpg 2x" sizes="(max-width: 1000px) 100vw, 1000px" loading="lazy" decoding="auto" alt="My image">
</picture>
```

## **Component Props**

Below is the list of props that the ```<Picture />``` component accepts. Only the src props are required.

### **src**

**Type:**

```tsx
{ 
  file: string;
  width:  number;
  height: number;
};
```

**Default:** `undefined`

The `src` prop specifies the filename, width, and height of the main image to be displayed.

> [!NOTE]
> The types for width and height must be of type 'number'. Using units such as %, pw, vw, etc., is not allowed.

The file specified in "file" refers to the "images" directory in the "src" directory by default.
This default directory can be changed by specifying a variable in ".env" created in the root of the Astro project to change the directory to be referenced.
The following is an example of changing to the "assets" directory.

```bash
DEFAULT_IMAGE_DIRECTORY=assets
```

### **artDirectives**

**Type:**

```tsx
interface artDirective extends src {
  media: string;
}[];
```

**Default:** `undefined`

The `artDirectives` prop specifies images for art direction, and its input is optional.

It extends the type from the “src” option and includes property “media”. Please note that it is in array format, and the output follows the order of the specified images.

### **alt**

**Type:** `string`

**Default:** `undefined`

The `artDirectives` alternative text to display if the image fails to load.

### **formats**

**Type:** `(| "heic" | "heif" | "avif" | "jpg" | "jpeg" | "png" | "tiff" | "webp" | "gif" | "SVG" )[]`;

**Default:** `["avif", "webp"]`

The `formats` prop specifies, in an array, the image formats to output primarily as next-generation formats. The original image format is always outputted by default and therefore does not need to be specified.

### **loading**

**Type:** `"lazy" | "eager" | "auto" | null`

**Default:** `"lazy"`

The prop of the `loading` attribute of the generated `<img />` element.

### **decoding**

**Type:** `"async" | "sync" | "auto" | null`

**Default:** `"auto"`

The prop of the `decoding` attribute of the generated `<img />` element.

### **class**

**Type:** `string`

**Default:** `undefined`

The prop of the `class` attribute of the generated `<img />` element.

### **style**

**Type:** `string`

**Default:** `undefined`

The prop of the `style` attribute of the generated `<img />` element.
