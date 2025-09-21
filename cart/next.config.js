/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/cart',
  assetPrefix: '/cart-static',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
      },
    ],
  },
};

module.exports = nextConfig;