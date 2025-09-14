const createNextIntlPlugin = require('next-intl/plugin');
const { withContentlayer } = require('next-contentlayer');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  transpilePackages: ['react-apexcharts', 'apexcharts'],
  // Disable static optimization for problematic pages
  trailingSlash: false,
  generateEtags: false,
};

module.exports = withContentlayer(withNextIntl(nextConfig));
