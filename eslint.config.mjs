import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Ignoring Prisma-generated folders
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/.prisma/**",
      "**/prisma/generated/**",
      "**/@prisma/**",
    ],
  },

  // Your standard ESLint config with disabled TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Add rules configuration
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];