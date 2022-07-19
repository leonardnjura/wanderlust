/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.pravatar.cc',
      'avatars.dicebear.com',
      'flagcdn.com',
      'mainfacts.com',
    ],
  },
  i18n: {
    locales: ['en', 'pt-BR'],
    defaultLocale: 'en',
    // localeDetection: false,
  },

  webpack: (config) => {
    config.resolve.fallback = { tls: false, fs: false, net: false };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/contact',
        destination: '/',
      },
    ];
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
