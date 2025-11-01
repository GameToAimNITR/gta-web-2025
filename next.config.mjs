/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/drei', 'three-stdlib'],
  experimental: {
    serverComponentsExternalPackages: ['@react-three/drei'],
  },
};

export default nextConfig;
