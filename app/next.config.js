const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'client/ui/styles')],
    prependData: '@import "src/client/ui/styles/bootstrap";'
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  images: {
    domains: [
      'images.unsplash.com',
      's3-us-west-2.amazonaws.com'
    ],
  },
};
