module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ["plugin:react/recommended", "airbnb", "plugin:i18next/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "i18next", "react-hooks"],
  rules: {
    "react/jsx-indent": [2, 2],
    quotes: [2, "double"], // "quotes": [2, "single"],
    "no-console": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-shadow": "off",
    "comma-dangle": "off",
    "implicit-arrow-linebreak": "off",
    "no-underscore-dangle": "off",
    "object-curly-newline": "off",
    "react/function-component-definition": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "import/no-extraneous-dependencies": "off",
    "arrow-body-style": "off",
    "max-len": ["error", { ignoreComments: true, code: 120 }],
    "i18next/no-literal-string": ["error", { markupOnly: true, onlyAttribute: [""] }],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-param-reassign": "off"
  },
  globals: {
    __IS_DEV__: true,
    __REST_API__BASE_URL__: true,
    __CONTACT_US_EMAIL__: true,
    __PROJECT_TYPE__: true
  },
  overrides: [
    {
      files: ["**/src/**/*.{test,stories}.{ts,tsx}"],
      rules: { "i18next/no-literal-string": "off", "max-len": "off" }
    },
    {
      files: ["**/src/**/*.slice.{ts,tsx}"],
      rules: { "no-param-reassign": "off" }
    }
  ]
};
