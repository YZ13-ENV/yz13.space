/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: [ "@repo/ui", "@repo/tailwind-config" ],
  experimental: {
    optimizeCss: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
};
