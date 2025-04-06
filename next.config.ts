import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'via.placeholder.com'],
  },
  swcMinify: true,
};

export default nextConfig;
