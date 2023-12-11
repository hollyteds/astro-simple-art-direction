# **BackgroundImage**

This Astro component specifies the background image using the style attribute.

## **Usage**

This is the simplest method.

```tsx
import { BackgroundImage } from 'astro-simple-art-direction';

<BackgroundImage TagName="section" image={ {src:{file:"my-image.jpg", width:500, height:2000}} }>
  <h1>astro-simple-art-direction</h1>
</BackgroundImage>
```

```html
<!-- Output Results -->
<section style="background-image: url(./_astro/my-image.hash.jpg);">
  <h1>astro-simple-art-direction</h1>
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

>[!TIP]
>The attribute type for this BackgroundImage component extends `HTMLAttributes<HTMLDivElement>`.
>It primarily enables the description of the following content.
>
>- `aria-*`attributes: Accessibility-related attributes like `aria-hidden`, `aria-labelledby`, etc.
>- `class`: The class name of the element
>- `id`: The ID of the element
>- `style`: An attribute used to directly specify CSS styles
>- Other standard HTML attributes: `tabIndex`, `title`, etc.

```tsx
import { BackgroundImage } from 'astro-simple-art-direction';

<BackgroundImage TagName="section" id="about" class="p-section" image={ {src:{file:"my-image.jpg", width:500, height:2000}} }>
  <h1>astro-simple-art-direction</h1>
</BackgroundImage>
```

```html
<!-- Output Results -->
<section id="about" class="p-section" style="background-image: url(./_astro/my-image.hash.jpg);">
  <h1>astro-simple-art-direction</h1>
</section>
```
