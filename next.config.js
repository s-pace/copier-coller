/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "printjam-stls.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/user/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/orders/:id',
        destination: '/orders/[id]',
      },
    ]
  },
};

module.exports = nextConfig;
