/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "res.cloudinary.com", "swiperjs.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dx8sic2mb/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
