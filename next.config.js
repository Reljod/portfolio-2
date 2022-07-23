const { env } = require("./src/server/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  baseUrl: "./src",
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'i.ibb.co', 'platform-lookaside.fbsbx.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
