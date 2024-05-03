/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: [ "@repo/ui", "@repo/tailwind-config" ],
  experimental: {
    instrumentationHook: true,
    parallelServerCompiles: true,
    swcMinify: true,
    optimizeCss: true
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
