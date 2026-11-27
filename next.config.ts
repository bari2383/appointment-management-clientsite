
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // reactCompiler: true,

    experimental: {
        serverActions: {
            bodySizeLimit: "60mb",
        },
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
            },
        ],
    },
};

export default nextConfig;
