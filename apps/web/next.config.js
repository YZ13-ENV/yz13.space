/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [ "@repo/ui" ],
  experimental: {
    parallelServerCompiles: true,
    swcMinify: true,
    optimizeServerReact: true,
    optimizePackageImports: [
      "@repo/ui",
      "tailwindcss"
    ],
    optimizeCss: true,
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    serverMinification: true,
    useLightningcss: true,
    workerThreads: true,
    useWasmBinary: true
  },
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  },
  webpack: function ( config, { webpack } ) {
    config.module.rules.push( {
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false },
    } );
    return config;
  },
};
