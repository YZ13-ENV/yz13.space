/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ "@repo/ui", "@yz13/api", "@microservice/playground", "@yz13/supabase" ],
  pageExtensions: [ 'js', 'jsx', 'md', 'mdx', 'ts', 'tsx' ],
  // experimental: {
  //   parallelServerCompiles: true,
  //   swcMinify: true,
  //   optimizeServerReact: true,
  //   optimizePackageImports: [
  //     "@repo/ui",
  //     "tailwindcss"
  //   ],
  //   optimizeCss: true,
  //   webpackBuildWorker: true,
  //   parallelServerBuildTraces: true,
  //   serverMinification: true,
  //   useLightningcss: true,
  //   workerThreads: true,
  //   useWasmBinary: true
  // },
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