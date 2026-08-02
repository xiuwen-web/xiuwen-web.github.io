import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export: no server runtime, no serverless functions.
  // Keeps the deployment a folder of files (PRD 25, 27).
  output: 'export',

  // next/image cannot optimise at request time without a server,
  // so images are pre-sized and compressed before they enter public/.
  images: { unoptimized: true },

  // Emits /path/index.html so static hosts resolve routes without rewriting.
  trailingSlash: true,

  reactStrictMode: true,

  // Fail the build on type errors rather than shipping them.
  // Next 16 removed the `eslint` key; linting runs as its own npm script.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
