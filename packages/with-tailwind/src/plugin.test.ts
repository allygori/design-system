import path from "node:path";
import postcss from "postcss";
import tailwind from "tailwindcss";
import type { Config } from "tailwindcss";
import { expect, it } from "vitest";
import allygory from "./index";

const html = String.raw;

function run(
  input: string,
  config: string | Config,
  plugin = tailwind,
): postcss.LazyResult<postcss.Root> {
  const { currentTestName } = expect.getState();

  return postcss(plugin(config)).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}

it("should generate boolean data attribute variants", async () => {
  const config = {
    content: [
      {
        raw: html`
          <div class="allygory-disabled:opacity-50" />
          <div class="group">
            <div class="group-allygory-disabled:cursor-not-allowed" />
          </div>
          <div class="group/named">
            <div class="group-allygory-disabled/named:cursor-not-allowed" />
          </div>
          <div class="peer" />
          <div class="peer-allygory-disabled:cursor-not-allowed" />
          <div class="peer/named" />
          <div class="peer-allygory-disabled/named:cursor-not-allowed" />
        `,
      },
    ],
    plugins: [allygory],
  };

  return run("@tailwind utilities", config).then((result) => {
    expect(result.css).toMatchInlineSnapshot(`
      ".allygory-disabled\\:opacity-50[data-disabled] {
          opacity: 0.5
      }
      .group\\/named[data-disabled] .group-allygory-disabled\\/named\\:cursor-not-allowed {
          cursor: not-allowed
      }
      .group[data-disabled] .group-allygory-disabled\\:cursor-not-allowed {
          cursor: not-allowed
      }
      .peer\\/named[data-disabled] ~ .peer-allygory-disabled\\/named\\:cursor-not-allowed {
          cursor: not-allowed
      }
      .peer[data-disabled] ~ .peer-allygory-disabled\\:cursor-not-allowed {
          cursor: not-allowed
      }"
    `);
  });
});

it("should generate value data attribute variants", async () => {
  const config = {
    content: [
      {
        raw: html`
          <div class="allygory-state-open:opacity-50" />
          <div class="group">
            <div class="group-allygory-state-open:cursor-not-allowed" />
          </div>
          <div class="group/named">
            <div class="group-allygory-state-open/named:cursor-not-allowed" />
          </div>
          <div class="peer" />
          <div class="peer-allygory-state-open:cursor-not-allowed" />
          <div class="peer/named" />
          <div class="peer-allygory-state-open/named:cursor-not-allowed" />
        `,
      },
    ],
    plugins: [allygory],
  };

  return run("@tailwind utilities", config).then((result) => {
    expect(result.css).toMatchSnapshot();
  });
});

it("should generate [width|height] utilities", async () => {
  const config = {
    content: [
      {
        raw: html`
          <div class="w-allygory-navigation-menu-viewport" />
          <div class="h-allygory-navigation-menu-viewport" />
          <div class="w-allygory-accordion-content" />
          <div class="h-allygory-accordion-content" />
          <div class="w-allygory-collapsible-content" />
          <div class="h-allygory-collapsible-content" />
        `,
      },
    ],
    plugins: [allygory],
  };

  return run("@tailwind utilities", config).then((result) => {
    expect(result.css).toMatchSnapshot();
  });
});

it("should generate [width|height] `content-available` utilities", async () => {
  const config = {
    content: [
      {
        raw: html`
          <div class="w-allygory-context-menu-content-available" />
          <div class="max-w-allygory-context-menu-content-available" />
          <div class="h-allygory-context-menu-content-available" />
          <div class="max-h-allygory-context-menu-content-available" />

          <div class="w-allygory-dropdown-menu-content-available" />
          <div class="max-w-allygory-dropdown-menu-content-available" />
          <div class="h-allygory-dropdown-menu-content-available" />
          <div class="max-h-allygory-dropdown-menu-content-available" />

          <div class="w-allygory-hover-card-content-available" />
          <div class="max-w-allygory-hover-card-content-available" />
          <div class="h-allygory-hover-card-content-available" />
          <div class="max-h-allygory-hover-card-content-available" />

          <div class="w-allygory-menubar-content-available" />
          <div class="max-w-allygory-menubar-content-available" />
          <div class="h-allygory-menubar-content-available" />
          <div class="max-h-allygory-menubar-content-available" />

          <div class="w-allygory-popover-content-available" />
          <div class="max-w-allygory-popover-content-available" />
          <div class="h-allygory-popover-content-available" />
          <div class="max-h-allygory-popover-content-available" />

          <div class="w-allygory-select-content-available" />
          <div class="max-w-allygory-select-content-available" />
          <div class="h-allygory-select-content-available" />
          <div class="max-h-allygory-select-content-available" />

          <div class="w-allygory-tooltip-content-available" />
          <div class="max-w-allygory-tooltip-content-available" />
          <div class="h-allygory-tooltip-content-available" />
          <div class="max-h-allygory-tooltip-content-available" />
        `,
      },
    ],
    plugins: [allygory],
  };

  return run("@tailwind utilities", config).then((result) => {
    expect(result.css).toMatchSnapshot();
  });
});

it("should generate [width|height] `trigger` utilities", async () => {
  const config = {
    content: [
      {
        raw: html`
          <div class="w-allygory-context-menu-trigger" />
          <div class="h-allygory-context-menu-trigger" />

          <div class="w-allygory-dropdown-menu-trigger" />
          <div class="h-allygory-dropdown-menu-trigger" />

          <div class="w-allygory-hover-card-trigger" />
          <div class="h-allygory-hover-card-trigger" />

          <div class="w-allygory-menubar-trigger" />
          <div class="h-allygory-menubar-trigger" />

          <div class="w-allygory-popover-trigger" />
          <div class="h-allygory-popover-trigger" />

          <div class="w-allygory-select-trigger" />
          <div class="h-allygory-select-trigger" />

          <div class="w-allygory-tooltip-trigger" />
          <div class="h-allygory-tooltip-trigger" />
        `,
      },
    ],
    plugins: [allygory],
  };

  return run("@tailwind utilities", config).then((result) => {
    expect(result.css).toMatchSnapshot();
  });
});

it("should generate `content-transform-origin` utilities", async () => {
  const config = {
    content: [
      {
        raw: html`
          <div class="origin-allygory-context-menu" />
          <div class="origin-allygory-dropdown-menu" />
          <div class="origin-allygory-hover-card" />
          <div class="origin-allygory-menubar" />
          <div class="origin-allygory-popover" />
          <div class="origin-allygory-select" />
          <div class="origin-allygory-tooltip" />
        `,
      },
    ],
    plugins: [allygory],
  };

  return run("@tailwind utilities", config).then((result) => {
    expect(result.css).toMatchSnapshot();
  });
});

it("should generate tooltip transform utilities", async () => {
  const config = {
    content: [
      {
        raw: html`
          <div class="translate-x-allygory-toast-swipe-end-x" />
          <div class="translate-y-allygory-toast-swipe-end-y" />
          <div class="translate-x-allygory-toast-swipe-move-x" />
          <div class="translate-y-allygory-toast-swipe-move-y" />
        `,
      },
    ],
    plugins: [allygory],
  };

  return run("@tailwind utilities", config).then((result) => {
    expect(result.css).toMatchSnapshot();
  });
});
