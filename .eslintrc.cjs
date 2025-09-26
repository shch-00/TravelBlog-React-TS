module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:prettier/recommended", // Добавляет Prettier правила в ESLint
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off", // Не требует импорта React в JSX (актуально для React 17+)
    "prettier/prettier": "error", // Ошибки при нарушении правил Prettier
    "@typescript-eslint/no-unused-vars": "warn", // Предупреждение о неиспользуемых переменных
  },
  settings: {
    react: {
      version: "detect", // Автоматически определяет версию React
    },
  },
};
