/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [ "@repo/ui", "@repo/tailwind-config", "@microservice/playground", "@microservice/widgets-lib", "@yz13/api", "@yz13/supabase" ],
  pageExtensions: [ 'js', 'jsx', 'md', 'mdx', 'ts', 'tsx' ],
  experimental: {
    optimizeCss: true,
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
};
export default nextConfig