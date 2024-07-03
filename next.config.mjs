/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ "@repo/ui", "@repo/tailwind-config", "@microservice/playground", "@microservice/widgets-lib", "@yz13/api", "@yz13/supabase" ],
  pageExtensions: [ 'js', 'jsx', 'md', 'mdx', 'ts', 'tsx' ],
  experimental: {
    optimizeCss: true,
    appDocumentPreloading: true,
    cssChunking: "loose",
    swcMinify: true,
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