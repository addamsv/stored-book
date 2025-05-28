module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "class-methods-use-this": 0,
    "no-console": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
      },
    ],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "import/prefer-default-export": ["off"],
    "no-unused-vars": "off",
    "max-len": ["warn", { code: 120 }],
    "no-underscore-dangle": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "warn",
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
};
