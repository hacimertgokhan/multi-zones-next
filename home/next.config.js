/** @type {import('next').NextConfig} */

// Cart uygulamasının Docker'da veya lokalde hangi URL'de çalıştığı
const CART_URL = process.env.CART_URL || 'http://localhost:3001';

const nextConfig = {

  async rewrites() {
    return [
      {
        source: "/cart",
        destination: `${CART_URL}/cart`,
      },
      {
        source: "/cart/:path*",
        destination: `${CART_URL}/cart/:path*`,
      },
      {
        source: "/cart-static/_next/:path*",
        destination: `${CART_URL}/cart-static/_next/:path*`,
      },
    ];
  },
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