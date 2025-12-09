/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration (Next.js 16 default)
  turbopack: {},
  
  // Webpack configuration (fallback for non-Turbopack builds)
  webpack: (config) => {
    // Exclude test files and LICENSE files from processing
    config.module.rules.push({
      test: /\.(test|spec|LICENSE)\.(ts|tsx|js|jsx)$/,
      use: 'ignore-loader',
    });
    
    return config;
  },
};

module.exports = nextConfig;
