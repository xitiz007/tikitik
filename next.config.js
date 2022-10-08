/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  images: {
    domains: ["www.devkshitiz.me", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
