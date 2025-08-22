/** @type {import('next').NextConfig} */
const nextConfig = {
  //   experimental: {
  //     allowedDevOrigins: ["192.168.56.1"],
  //     turbo: {
  //       rules: {
  //         "*.svg": {
  //           loaders: ["@svgr/webpack"],
  //           as: "*.js",
  //         },
  //       },
  //     },
  //   },
  allowedDevOrigins: ["192.168.56.1"],
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "api.domainkamu.com",
      "storage.googleapis.com",
      "images.unsplash.com",
    ],
    formats: ["image/webp", "image/avif"],
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
