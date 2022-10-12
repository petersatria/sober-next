/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        DEV_URL: process.env.DEV_URL,
        REACT_APP_URL: process.env.REACT_APP_URL,
    },
    images: {
        domains: ['cdn.shopify.com', 'd29c1z66frfv6c.cloudfront.net', 'demo.uix.store'],
    },
};

module.exports = nextConfig;
