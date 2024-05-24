/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ "@repo/ui", "@repo/tailwind-config", "@microservice/playground", "@yz13/supabase" ],
  pageExtensions: [ 'js', 'jsx', 'md', 'mdx', 'ts', 'tsx' ],
  experimental: {
    serverComponentsExternalPackages: [ "@yz13/api" ],
    optimizeCss: true,
    swcMinify: true,
    // optimizePackageImports: [
    // "@repo/ui",
    // "tailwindcss"
    // ],
    // parallelServerCompiles: true,
    //   optimizeServerReact: true,
    //   webpackBuildWorker: true,
    //   parallelServerBuildTraces: true,
    //   serverMinification: true,
    //   useLightningcss: true,
    //   workerThreads: true,
    //   useWasmBinary: true
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
export default nextConfig