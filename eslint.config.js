import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    ...globalIgnores(["dist"]),
    ...tseslint.config(
        js.configs.recommended,
        tseslint.configs.recommendedTypeChecked,
        reactX.configs["recommended-typescript"],
        reactDom.configs.recommended,
        reactHooks.configs.flat.recommended,
    ),
    {
        files: ["**/*.{js,cjs,mjs}"],
        extends: [tseslint.configs.disableTypeChecked],
        rules: {
            "react-refresh/only-export-components": "off",
        },
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.app.json", "./tsconfig.node.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    },
    {
        plugins: {
            "react-refresh": reactRefresh,
        },
    },
]);
