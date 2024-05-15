# **BackgroundPicture**

The `BackgroundPicture` component generates a background image using the "Picture" component.
The background image is applied with the 'aria-hidden' attribute set to 'true'. It cannot be changed.

## **Usage**

This component is used to wrap elements where you want to set a background image.

```tsx
import { BackgroundPicture } from 'astro-simple-art-direction';

<BackgroundPicture
  TagName="section" 
  images={{ 
    src: {
      file:"my-image.jpg",
      width: 1000,
      height: 800
    }
  }}
/>
  <h1>astro-simple-art-direction</h1>
</BackgroundPicture>
```

```html
<!-- Output Results -->
<section data-astro-hash class="bgp">
  <figure aria-hidden="true" data-astro-hash style="--imageWidth: 100%;--imageHeight: 100%;--attachment: cover;">
    <picture>
      <source srcset="./_astro/my-image.hash.avif 1x,./_astro/my-image.hash.avif 2x" sizes="(max-width: 500px) 100vw, 500px" type="image/avif">
      <source srcset="./_astro/my-image.hash.webp 1x,./_astro/my-image.hash.webp 2x" sizes="(max-width: 500px) 100vw, 500px" type="image/webp"> <img width="500" height="2000" src="./_astro/my-image.hash.jpg" srcset="./_astro/my-image.hash.jpg 1x,./_astro/my-image.hash.jpg 2x" sizes="(max-width: 500px) 100vw, 500px" loading="lazy" decoding="auto" alt="">
    </picture>
  </figure>
  <div class="bgp-inner" data-astro-hash style="--imageWidth: 100%;--imageHeight: 100%;--attachment: cover;">
    <h1>astro-simple-art-direction</h1>
  </div>
</section>
```

## **Component Props**

Below is the list of props that the ```<BackgroundImage />``` component accepts. Only the image props are required.

### **TagName**

**Type:**

```tsx
| "div" | "section" | "article" | "header" | "footer" | "main" | "aside" | "nav" | "figure" | "blockquote" | "q" | "cite" | "a" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "ol" | "li" | "dl" | "dt" | "dd"
```

**Default:** `div`

The `TagName` prop specifies the tag that wraps the background image and inner elements.

### ~~**src** , **artDirectives** , **alt** , **loading** , **formats**~~

~~The props `src`, `artDirectives`, `alt`, `loading`, and `formats` follow the same setup method as the "Picture" component.~~

> [!NOTE]
> The src property was deprecated in version 1.0.4. This property must be defined as a property of the 'images' object.

### **images**

The properties of the 'images' prop are passed directly to the 'Picture' component.

### **size.width** , **size.height**

**Type:** units such as px, %, em, rem, vw, vh, vmin, vmax, svw, svh, lvw, lvh, dvw, dvh, in addition to 'auto'.

**Default:** `size.width "100%", size.height: "100%"`

This `size` prop corresponds to the 'background-size' in CSS. It's set in an object format to define width and height.

### **objectFit**

**Type:** `"fill" | "contain" | "cover" | "none" | "scale-down" | "null"`

**Default:** `"cover"`

The `objectFit` prop specifies the object-fit for the background image.

### **position**

**Type:** `| "top" | "bottom" | "left" | "right" | "center" | "top left" | "top right" | "bottom left" | "bottom right"`

**Default:** `"center"`

The `position` prop specifies the reference point for the background image, which can be specified with Keyword values, values or Edge offsets values.

[See MDN - object-position]

[See MDN - object-position]: https://developer.mozilla.org/en-US/docs/Web/CSS/object-position/

>[!TIP] The attribute type of this BackgroundPicture component is an extension of HTMLAttributes<HTMLDivElement>. It primarily allows the description of the following content.
>
>- `aria-*`attributes: Accessibility-related attributes like `aria-hidden`, `aria-labelledby`, etc.
>- `class`: The class name of the element
>- `id`: The ID of the element
>- `style`: An attribute used to directly specify CSS styles
>- Other standard HTML attributes: `tabIndex`, `title`, etc.

```tsx
import { BackgroundPicture } from 'astro-simple-art-direction';

<BackgroundPicture
  TagName="section" 
  id="greeting"
  class="p-section"
  images={{ 
    src: {
      file:"my-image.jpg",
      width: 1000,
      height: 800
    }
  }}
/>
  <h1>astro-simple-art-direction</h1>
</BackgroundPicture>
```

```html
<!-- Output Results -->
<section id="greeting" data-astro-hash class="bgp p-section">
  <figure aria-hidden="true" data-astro-hash style="--imageWidth: 100%;--imageHeight: 100%;--attachment: cover;">
    <picture>
      <source srcset="./_astro/my-image.hash.avif 1x,./_astro/my-image.hash.avif 2x" sizes="(max-width: 500px) 100vw, 500px" type="image/avif">
      <source srcset="./_astro/my-image.hash.webp 1x,./_astro/my-image.hash.webp 2x" sizes="(max-width: 500px) 100vw, 500px" type="image/webp"> <img width="500" height="2000" src="./_astro/my-image.hash.jpg" srcset="./_astro/my-image.hash.jpg 1x,./_astro/my-image.hash.jpg 2x" sizes="(max-width: 500px) 100vw, 500px" loading="lazy" decoding="auto" alt="">
    </picture>
  </figure>
  <div class="bgp-inner" data-astro-hash style="--imageWidth: 100%;--imageHeight: 100%;--attachment: cover;">
    <h1>astro-simple-art-direction</h1>
  </div>
</section>
```
