/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@allygory/eslint-config/react.js"],
  rules: {
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
  },
};
