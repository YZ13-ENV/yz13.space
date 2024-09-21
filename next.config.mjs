/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote", "yz13", "@yz13/mono"],
  compress: true,
  cleanDistDir: true,
  experimental: {
    preloadEntriesOnStart: true,
    optimizePackageImports: ["dayjs", "yz13", "@yz13/mono"],
    appDocumentPreloading: true,
    useEarlyImport: true,
    optimizeCss: true,
    gzipSize: true,
    optimizeServerReact: true,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
    serverMinification: true,
    cssChunking: "loose",
    swcMinify: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};
export default nextConfig;
