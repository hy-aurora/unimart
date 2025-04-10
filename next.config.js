/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com',], // Allow all hosts
    remotePatterns: [], // Clear any specific patterns
  },
};

module.exports = nextConfig;
