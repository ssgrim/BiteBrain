module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  env: {
    node: true,
    es2022: true,
  },
  ignorePatterns: [
    "dist/",
    "build/",
    ".next/",
    "node_modules/",
    "*.js",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
  },
  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx"],
      env: {
        jest: true,
      },
    },
  ],
};
