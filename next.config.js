/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.shopify.com', 'd29c1z66frfv6c.cloudfront.net', 'demo.uix.store', 'sp-ao.shortpixel.ai'],
  },
}

module.exports = nextConfig
