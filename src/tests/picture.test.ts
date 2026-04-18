import { beforeAll, expect, test } from 'vitest';
import { createRequire } from 'node:module';
import Picture from "../components/Picture.astro";

type AstroContainerLike = {
  create: () => Promise<{
    renderToString: (component: unknown, options?: { props?: Record<string, unknown> }) => Promise<string>;
  }>;
};

const require = createRequire(import.meta.url);
const hasContainer = (() => {
  try {
    require.resolve('astro/container');
    return true;
  } catch {
    return false;
  }
})();

const loadContainer = async (): Promise<AstroContainerLike> => {
  const moduleId = 'astro/container' as string;
  const mod = await import(moduleId) as unknown as {
    AstroContainer?: AstroContainerLike;
    experimental_AstroContainer?: AstroContainerLike;
  };
  const container = mod.AstroContainer ?? mod.experimental_AstroContainer;
  if (!container) throw new Error('AstroContainer is not available in astro/container.');
  return container;
};
 
const ensureAstroAsset = () => {
  const globalWithAsset = globalThis as typeof globalThis & {
    astroAsset?: { referencedImages?: Set<string> };
  };
  if (!globalWithAsset.astroAsset) globalWithAsset.astroAsset = {};
  if (!globalWithAsset.astroAsset.referencedImages) {
    globalWithAsset.astroAsset.referencedImages = new Set();
  }
};

beforeAll(() => {
  ensureAstroAsset();
});

const testIf = hasContainer ? test : test.skip;

const renderPicture = async (props: Record<string, unknown>) => {
  const AstroContainer = await loadContainer();
  const container = await AstroContainer.create();
  return container.renderToString(Picture, { props });
};

testIf('Picture renders art direction sources', async () => {
  const result = await renderPicture({
    src: {
      file: "test.jpg",
      width: 500,
      height: 500,
    },
    artDirectives: [
      {
        media: "(max-width: 767px)",
        file: "test.jpg",
        width: 300,
        height: 150,
      }
    ],
    alt: "Art direction image",
  });
  expect(result).toContain('<picture');
  expect(result).toContain('media="(max-width: 767px)"');
  expect(result).toContain('alt="Art direction image"');
}, 15000);

testIf('Picture supports sizes and widths', async () => {
  const result = await renderPicture({
    src: {
      file: "test.jpg",
      width: 500,
      height: 500,
      widths: [240, 500],
      sizes: "(max-width: 600px) 100vw, 600px",
    },
  });
  expect(result).toContain('sizes="(max-width: 600px) 100vw, 600px"');
  expect(result).toContain('240w');
});

testIf('Picture supports formats overrides', async () => {
  const result = await renderPicture({
    src: {
      file: "test.jpg",
      width: 500,
      height: 500,
    },
    formats: ["png"],
  });
  expect(result).toContain('type="image/png"');
});

testIf('Picture outputs image/jpeg MIME for jpg sources', async () => {
  const result = await renderPicture({
    src: {
      file: "test.png",
      width: 500,
      height: 500,
    },
    formats: ["jpg"],
  });
  expect(result).toContain('type="image/jpeg"');
  expect(result).not.toContain('type="image/jpg"');
});

testIf('Picture supports loading, decoding, class, and style', async () => {
  const result = await renderPicture({
    src: {
      file: "test.jpg",
      width: 500,
      height: 500,
    },
    loading: "eager",
    decoding: "sync",
    class: "hero-image",
    style: "color:red",
  });
  expect(result).toContain('loading="eager"');
  expect(result).toContain('decoding="sync"');
  expect(result).toContain('fetchpriority="high"');
  expect(result).toContain('class="hero-image"');
  expect(result).toContain('style="color:red"');
});

testIf('Picture without sources', async () => {
  const result = await renderPicture({
    src: {
      file: "test.jpg",
      width: 500,
      height: 500,
    },
    formats: [],
  });
  expect(result).toContain('<img');
  expect(result).not.toContain('<picture');
});

testIf('Picture renders svg as img only', async () => {
  const result = await renderPicture({
    src: {
      file: "test.svg",
      width: 500,
      height: 500,
    },
  });
  expect(result).toContain('<img');
  expect(result).not.toContain('<picture');
  expect(result).toMatch(/<img[^>]+src="[^"]+"/);
  expect(result).toContain('width="500"');
  expect(result).toContain('height="500"');
});
 
