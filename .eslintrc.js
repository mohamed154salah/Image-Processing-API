module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      { semi: true, quotes: ["error", "double"], parser: "flow", useTabs: false }
    ],
    "no-var": "error",
    "prefer-const": "warn"
  }
};