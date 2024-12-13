import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config} */
export default [
  {
    // Reglas comunes para archivos .js, .mjs, .cjs, .ts
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  {
    // Reglas recomendadas para archivos .js
    files: ["**/*.js"],
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
  {
    // Reglas recomendadas para archivos .ts
    files: ["**/*.ts"],
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
];
