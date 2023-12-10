# **BackgroundImage**

## **Usage**

```tsx
import { Picture } from 'astro-simple-art-direction';

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
