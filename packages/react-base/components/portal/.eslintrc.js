/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@allygory/eslint-config/react.js"],
  rules: {
    "eslint-comments/require-description": ["off", { ignore: [] }],
  },
};
