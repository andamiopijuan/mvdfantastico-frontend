/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Disable Next.js image optimization for API-sourced media.
    // The optimizer runs server-side inside Docker and cannot reach
    // localhost:8000 (which resolves to the container itself).
    // Images are already properly sized JPEGs, so optimization is not needed.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.montevideofan.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'montevideofan.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
