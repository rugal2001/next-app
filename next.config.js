/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com','www.foot01.com', 'localhost', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig


