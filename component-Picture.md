# **Picture**

This Astro component generates a ```<picture/>``` element for displaying images. It does not output extra class names or styles and supports multiple image formats and media queries for responsive image display.

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
  <source srcset="./_astro/my-image.hash.avif 1000w,./_astro/my-image.hash.avif 2000w" sizes="(max-width: 1000px) 100vw, 1000px" type="image/avif">
  <source srcset="./_astro/my-image.hash.webp 1000w,./_astro/my-image.hash.webp 2000w" sizes="(max-width: 1000px) 100vw, 1000px" type="image/webp">
  <img width="1000" height="800" src="./_astro/my-image.hash.jpg" srcset="./_astro/my-image.hash.jpg 1000w,./_astro/my-image.hash.jpg 2000w" sizes="(max-width: 1000px) 100vw, 1000px" loading="lazy" decoding="auto" alt="My Image">
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
  <source media="(max-width: 767px)" width="400" height="400" srcset="./_astro/my-image-sp.hash.avif 400w,./_astro/my-image-sp.hash.avif 800w" sizes="(max-width: 400px) 100vw, 400px" type="image/avif">
  <source media="(max-width: 767px)" width="400" height="400" srcset="./_astro/my-image-sp.hash.webp 400w,./_astro/my-image-sp.hash.webp 800w" sizes="(max-width: 400px) 100vw, 400px" type="image/webp">
  <source media="(max-width: 767px)" width="400" height="400" srcset="./_astro/my-image-sp.hash.jpg 400w,./_astro/my-image-sp.hash.jpg 800w" sizes="(max-width: 400px) 100vw, 400px">
  <source srcset="./_astro/my-image.hash.avif 1000w,./_astro/my-image.hash.avif 2000w" sizes="(max-width: 1000px) 100vw, 1000px" type="image/avif">
  <source srcset="./_astro/my-image.hash.webp 1000w,./_astro/my-image.hash.webp 2000w" sizes="(max-width: 1000px) 100vw, 1000px" type="image/webp">
  <img width="1000" height="800" src="./_astro/my-image.hash.jpg" srcset="./_astro/my-image.hash.jpg 1000w,./_astro/my-image.hash.jpg 2000w" sizes="(max-width: 1000px) 100vw, 1000px" loading="lazy" decoding="auto" alt="My Image">
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
  widths: number[]; //optional ( Added in: @1.0.7 )
  sizes: string; //optional ( Added in: @1.0.8 )
};
```

The `src` property specifies the file name, width, and height of the main image to be displayed.

#### **file** (required)

Specifies the file name of the image to be displayed. Images within the public directory cannot be specified, as this component is intended for optimization.

> [!WARNING]
> The types for width and height must be of type 'number'. Using units such as %, pw, vw, etc., is not allowed.

The file specified in "file" refers to the "images" directory in the "src" directory by default.
This default directory can be changed by specifying a variable in ".env" created in the root of the Astro project to change the directory to be referenced.
The following is an example of changing to the "assets" directory.

```bash
DEFAULT_IMAGE_DIRECTORY=assets
```

#### **width** (required)

A `width` of the generated image.

#### **height** (required)

A `height` of the generated image.

#### **widths** (optional)

A list of `widths` to generate for the image.

If provided, this value will be used to generate a srcset attribute on the <img> tag.

> [!WARNING]
> Unlike Astro’s <Image> component, this component does not ignore upscaling.

#### **sizes** (optional)

If the `sizes` attribute is not specified, it will generate based on the width value. For example, if the `width` is set to 640, the following will be generated.

```html
 sizes="(max-width:640px) 100vw, 640px"
```

This is not necessarily the optimal setting. It is strongly recommended to specify `sizes` when `widths` is defined.

> [!NOTE]
> The src attribute is generally used to specify the source file, and it should not be treated as an object. While I would like to correct this upon request, it has been kept as is for backward compatibility, as this is mostly a personal project.

### **artDirectives**

**Type:**

```tsx
interface artDirective extends src {
  media: string;
}[];
```

**Default:** `undefined`

The `artDirectives` prop specifies images for art direction, and its input is optional.

It extends the type from the `src` option and includes property `media`. Please note that it is in array format, and the output follows the order of the specified images.

### **alt**

**Type:** `string`

**Default:** `undefined`

The `artDirectives` alternative text to display if the image fails to load.

### **formats**

**Type:** `(| "heic" | "heif" | "avif" | "jpg" | "jpeg" | "png" | "tiff" | "webp" | "gif" | "svg" )[]`;

**Default:** `["avif", "webp"]`

The `formats` prop specifies, in an array, the image formats to output primarily as next-generation formats. The original image format is always outputted by default and therefore does not need to be specified.

If `formats` or `DEFAULT_GENERATE_FORMAT` includes `svg`, it is ignored for generated sources. SVG is supported as the original image format.

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
