import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // other config options
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
        pathname: "/apod/**",
      },
    ],
  },
};

export default nextConfig;
