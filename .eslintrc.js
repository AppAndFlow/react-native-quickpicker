module.exports = {
  env: { browser: true, es6: true, jest: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  globals: { __DEV__: "readonly" },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 6,
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "react-hooks"],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/order": [
      "error",
      {
        groups: [["builtin", "external", "internal"]],
        "newlines-between": "always",
      },
    ],
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
  },
  settings: { react: { version: "detect" } },
};
