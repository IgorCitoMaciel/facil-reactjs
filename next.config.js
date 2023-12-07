/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],

  eslint: {
    ignoreDuringBuilds: true,
  },

}
 

module.exports = nextConfig


