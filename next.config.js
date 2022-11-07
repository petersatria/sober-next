/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        DEV_URL: process.env.DEV_URL,
        REACT_APP_URL: process.env.REACT_APP_URL,
        NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    },
    images: {
        domains: [
            'cdn.shopify.com',
            'd29c1z66frfv6c.cloudfront.net',
            'demo.uix.store',
            'sp-ao.shortpixel.ai',
            'apiv1sober.herokuapp.com'
        ],
    },
};

module.exports = nextConfig;
