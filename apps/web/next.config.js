/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: [ "@repo/ui" ],
  experimental: {
    parallelServerCompiles: true,
    swcMinify: true,
    // optimizeCss: true
  },
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  }
};
