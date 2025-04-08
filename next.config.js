/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Allow all hosts
    remotePatterns: [], // Clear any specific patterns
  },
};

module.exports = nextConfig;
