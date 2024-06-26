import plugin from "tailwindcss/plugin";

interface Options {
  variantPrefix?: string;
}

export = plugin.withOptions<Options>(
  (options) =>
    ({ addUtilities, matchVariant }) => {
      options = options
        ? options
        : {
            variantPrefix: "allygory",
          };

      const variantPrefix =
        options.variantPrefix === "" ||
        (typeof options.variantPrefix === "boolean" &&
          options.variantPrefix === false)
          ? ""
          : `${options.variantPrefix}`;

      // Adds variants for boolean data attributes
      const booleanAttributes = {
        disabled: "disabled",
        highlighted: "highlighted",
        placeholder: "placeholder",
      } as const;

      matchVariant(
        variantPrefix,
        (value) => {
          return `&[data-${value}]`;
        },
        {
          values: booleanAttributes,
        },
      );

      matchVariant(
        `group-${variantPrefix}`,
        (value, { modifier }) => {
          return modifier
            ? `:merge(.group\\/${modifier})[data-${value}] &`
            : `:merge(.group)[data-${value}] &`;
        },
        {
          values: booleanAttributes,
        },
      );

      matchVariant(
        `peer-${variantPrefix}`,
        (value, { modifier }) => {
          return modifier
            ? `:merge(.peer\\/${modifier})[data-${value}] ~ &`
            : `:merge(.peer)[data-${value}] ~ &`;
        },
        {
          values: booleanAttributes,
        },
      );

      // Adds variants for value data attributes
      Object.entries({
        align: ["center", "end", "start"],
        state: [
          "active",
          "checked",
          "closed",
          "delayed-open",
          "hidden",
          "inactive",
          "indeterminate",
          "instant-open",
          "off",
          "on",
          "open",
          "unchecked",
          "visible",
        ],
        side: ["bottom", "left", "right", "top"],
        orientation: ["horizontal", "vertical"],
        motion: ["from-end", "from-start", "to-end", "to-start"],
        swipe: ["cancel", "end", "move", "start"],
        "swipe-direction": ["down", "left", "right", "up"],
      } as const).forEach(([attributeName, attributeValues]) => {
        const values = Object.fromEntries(
          attributeValues.map((item) => [item, item]),
        );

        matchVariant(
          `${variantPrefix}-${attributeName}`,
          (value) => {
            return `&[data-${attributeName}="${value}"]`;
          },
          {
            values,
          },
        );

        matchVariant(
          `group-${variantPrefix}-${attributeName}`,
          (value, { modifier }) => {
            return modifier
              ? `:merge(.group\\/${modifier})[data-${attributeName}="${value}"] &`
              : `:merge(.group)[data-${attributeName}="${value}"] &`;
          },
          {
            values,
          },
        );

        matchVariant(
          `peer-${variantPrefix}-${attributeName}`,
          (value, { modifier }) => {
            return modifier
              ? `:merge(.peer\\/${modifier})[data-${attributeName}="${value}"] ~ &`
              : `:merge(.peer)[data-${attributeName}="${value}"] ~ &`;
          },
          {
            values,
          },
        );
      });

      // Adds the following [width|height] utilities
      // `--allygory-accordion-content-[width|height]`,
      // `--allygory-collapsible-content-[width|height]`,
      // `--allygory-navigation-menu-viewport-[width|height]`,
      (
        [
          "accordion-content",
          "collapsible-content",
          "navigation-menu-viewport",
        ] as const
      ).forEach((kind) => {
        addUtilities({
          [`.w-${variantPrefix}-${kind}`]: {
            width: `var(--allygory-${kind}-width)`,
          },
        });
        addUtilities({
          [`.h-${variantPrefix}-${kind}`]: {
            height: `var(--allygory-${kind}-height)`,
          },
        });
      });

      // Adds the following [width|height] utilities
      // `--allygory-context-menu-content-available-[width|height]`,
      // `--allygory-context-menu-trigger-[width|height]`,
      // `--allygory-dropdown-menu-content-available-[width|height]`,
      // `--allygory-dropdown-menu-trigger-[width|height]`,
      // `--allygory-hover-card-content-available-[width|height]`,
      // `--allygory-hover-card-trigger-[width|height]`,
      // `--allygory-menubar-content-available-[width|height]`,
      // `--allygory-menubar-trigger-[width|height]`,
      // `--allygory-popover-content-available-[width|height]`,
      // `--allygory-popover-trigger-[width|height]`,
      // `--allygory-select-content-available-[width|height]`,
      // `--allygory-select-trigger-[width|height]`,
      // `--allygory-tooltip-content-available-[width|height]`,
      // `--allygory-tooltip-trigger-[width|height]`,
      (
        [
          "context-menu",
          "dropdown-menu",
          "hover-card",
          "menubar",
          "popover",
          "select",
          "tooltip",
        ] as const
      ).forEach((component) => {
        addUtilities({
          [`.w-${variantPrefix}-${component}-content-available`]: {
            width: `var(--allygory-${component}-content-available-width)`,
          },
        });
        addUtilities({
          [`.max-w-${variantPrefix}-${component}-content-available`]: {
            maxWidth: `var(--allygory-${component}-content-available-width)`,
          },
        });
        addUtilities({
          [`.h-${variantPrefix}-${component}-content-available`]: {
            height: `var(--allygory-${component}-content-available-height)`,
          },
        });
        addUtilities({
          [`.max-h-${variantPrefix}-${component}-content-available`]: {
            maxHeight: `var(--allygory-${component}-content-available-height)`,
          },
        });
        addUtilities({
          [`.w-${variantPrefix}-${component}-trigger`]: {
            width: `var(--allygory-${component}-trigger-width)`,
          },
        });
        addUtilities({
          [`.h-${variantPrefix}-${component}-trigger`]: {
            height: `var(--allygory-${component}-trigger-height)`,
          },
        });
      });

      // Adds the following content-transform-origin utilities
      // `--allygory-context-menu-content-transform-origin`,
      // `--allygory-dropdown-menu-content-transform-origin`,
      // `--allygory-hover-card-content-transform-origin `,
      // `--allygory-menubar-content-transform-origin`
      // `--allygory-popover-content-transform-origin`,
      // `--allygory-select-content-transform-origin`,
      // `--allygory-tooltip-content-transform-origin`
      (
        [
          "context-menu",
          "dropdown-menu",
          "hover-card",
          "menubar",
          "popover",
          "select",
          "tooltip",
        ] as const
      ).forEach((component) => {
        addUtilities({
          [`.origin-${variantPrefix}-${component}`]: {
            "transform-origin": `var(--allygory-${component}-content-transform-origin)`,
          },
        });
      });

      // Adds the following [x|y] utilities
      // `--allygory-toast-swipe-end-[x|y]`,
      // `--allygory-toast-swipe-move-[x|y]`,
      (["toast-swipe-end", "toast-swipe-move"] as const).forEach((swipe) => {
        addUtilities({
          [`.translate-x-${variantPrefix}-${swipe}-x`]: {
            transform: `translateX(var(--allygory-${swipe}-x))`,
          },
        });
        addUtilities({
          [`.translate-y-${variantPrefix}-${swipe}-y`]: {
            transform: `translateY(var(--allygory-${swipe}-y))`,
          },
        });
      });
    },
);
