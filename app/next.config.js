const path = require('path');
const withImages = require('next-images');

/** @type {import('next').NextConfig} */
module.exports = withImages({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'client/ui/styles')],
    prependData: '@import "src/client/ui/styles/bootstrap";'
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
});
