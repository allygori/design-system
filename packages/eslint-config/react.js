const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/react",
    // "@vercel/style-guide/prettier",

    // "prettier",
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  plugins: ["only-warn"],
  globals: {
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".turbo/",
    ".temp/",
    ".trash/",
    ".eslintrc.js",
    "tsup.config.ts",
    "**/*.css",
  ],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    // react-jsx
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        ignoreCase: false,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    "react/jsx-pascal-case": [
      "warn",
      {
        allowNamespace: true,
      },
    ],
    "react/function-component-definition": [
      1,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "function-expression",
      },
    ],
  },
};
