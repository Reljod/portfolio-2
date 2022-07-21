const { env } = require("./src/server/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  baseUrl: "./src",
  reactStrictMode: true,
  images: {
    domains: ['www.dropbox.com'],
  },
};

module.exports = nextConfig;
