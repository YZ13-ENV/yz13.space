/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ "next-mdx-remote", "@repo/tailwind-config" ],
  pageExtensions: [ 'js', 'jsx', 'md', 'mdx', 'ts', 'tsx' ],
  compress: true,
  experimental: {
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
        protocol: 'https',
        hostname: '*'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://www.api.yz13.space/:path*"
      }
    ]
  }
};
export default nextConfig