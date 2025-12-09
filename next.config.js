/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export - use Next.js runtime on Cloudflare Pages
  // Configure in Cloudflare Dashboard: Framework preset = Next.js
  
  // Turbopack configuration (Next.js 16 default)
  turbopack: {},
  
  // Webpack configuration (fallback for non-Turbopack builds)
  webpack: (config, { isServer }) => {
    // Exclude test files and LICENSE files from processing
    config.module.rules.push({
      test: /\.(test|spec|LICENSE)\.(ts|tsx|js|jsx)$/,
      use: 'ignore-loader',
    });
    
    return config;
  },
};

module.exports = nextConfig;
