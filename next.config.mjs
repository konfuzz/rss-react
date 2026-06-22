/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.62.33'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
    ],
  },
}
 
export default withNextIntl(nextConfig)