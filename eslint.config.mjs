import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local preview roots: copies of out/ served per design variant. Same
    // reason out/ is ignored — it is build output, and linting it reports
    // errors in minified Next chunks that no one can act on. CI never has
    // this directory (it is gitignored), so without this entry `npm run
    // lint` disagrees with the workflow that gates the deploy.
    "preview/**",
  ]),
]);

export default eslintConfig;
