import { beforeAll, expect, test } from 'vitest';
import { createRequire } from 'node:module';
import BackgroundImage from "../components/BackgroundImage.astro";
import BackgroundPicture from "../components/BackgroundPicture.astro";

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

const renderComponent = async (component: unknown, props: Record<string, unknown>) => {
  const AstroContainer = await loadContainer();
  const container = await AstroContainer.create();
  return container.renderToString(component, { props });
};

testIf('BackgroundImage preserves user style', async () => {
  const result = await renderComponent(BackgroundImage, {
    TagName: "section",
    style: "color:red;",
    image: {
      src: {
        file: "test.jpg",
        width: 500,
        height: 500,
      },
    },
  });

  expect(result).toContain('<section');
  expect(result).toContain('color:red');
  expect(result).toContain('background-image: url(');
}, 15000);

testIf('BackgroundPicture preserves user style', async () => {
  const result = await renderComponent(BackgroundPicture, {
    TagName: "section",
    style: "padding:1rem;",
    images: {
      src: {
        file: "test.jpg",
        width: 500,
        height: 500,
      },
    },
  });

  expect(result).toContain('<section');
  expect(result).toContain('padding:1rem');
  expect(result).toContain('--image-width:100%');
  expect(result).toContain('--attachment:cover');
}, 15000);
