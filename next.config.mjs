/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  serverExternalPackages: ['firebase-admin', '@google-cloud/firestore', '@opentelemetry/api'],
};

export default nextConfig;
