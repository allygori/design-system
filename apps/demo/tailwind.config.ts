import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in-down": "fadeInDown 0.5s ease-out",
        // Toast
        "toast-hide": "toast-hide 100ms ease-in forwards",
        "toast-slide-in-right":
          "toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-slide-in-bottom":
          "toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-swipe-out-x": "toast-swipe-out-x 100ms ease-out forwards",
        "toast-swipe-out-y": "toast-swipe-out-y 100ms ease-out forwards",

        // Action Sheet
        "action-sheet-hide": "action-sheet-hide 100ms ease-out forwards",
        "action-sheet-slide-in-bottom":
          "action-sheet-slide-in-bottom 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        "action-sheet-swipe-out-x": "action-sheet-swipe-out-x 100ms ease-out forwards",
        "action-sheet-swipe-out-y": "action-sheet-swipe-out-y 100ms ease-out forwards",
      },
      keyframes: {
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        // Toast
        "toast-hide": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "toast-slide-in-right": {
          "0%": { transform: `translateX(calc(100% + 1rem))` },
          "100%": { transform: "translateX(0)" },
        },
        "toast-slide-in-bottom": {
          "0%": { transform: `translateY(calc(100% + 1rem))` },
          "100%": { transform: "translateY(0)" },
        },
        "toast-swipe-out-x": {
          "0%": { transform: "translateX(var(--allygory-toast-swipe-end-x))" },
          "100%": {
            transform: `translateX(calc(100% + 1rem))`,
          },
        },
        "toast-swipe-out-y": {
          "0%": { transform: "translateY(var(--allygory-toast-swipe-end-y))" },
          "100%": {
            transform: `translateY(calc(100% + 1rem))`,
          },
        },
        // Action Sheet
        "action-sheet-hide": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "action-sheet-slide-in-bottom": {
          "0%": { transform: `translateY(calc(100% + 1rem))` },
          "100%": { transform: "translateY(0)" },
        },
        "action-sheet-swipe-out-x": {
          "0%": {
            transform: "translateX(var(--allygory-action-sheet-swipe-end-x))",
          },
          "100%": {
            transform: `translateX(calc(100% + 1rem))`,
          },
        },
        "action-sheet-swipe-out-y": {
          "0%": {
            transform: "translateY(var(--allygory-action-sheet-swipe-end-y))",
          },
          "100%": {
            transform: `translateY(calc(100% + 1rem))`,
          },
        },
      },
    },
  },
  plugins: [require("@allygory/with-tailwind")()],
};
export default config;
