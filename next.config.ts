import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR + dev assets to be fetched from other devices on the LAN
  // (phones, tablets, other laptops) when testing the dev server over Wi-Fi.
  allowedDevOrigins: ["192.168.0.108"],
};

export default nextConfig;
