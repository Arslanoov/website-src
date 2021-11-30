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
};
