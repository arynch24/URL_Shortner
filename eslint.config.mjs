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

  // Your standard ESLint config
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
