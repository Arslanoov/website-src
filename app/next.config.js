const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'ui/styles')],
    prependData: '@import "src/ui/styles/bootstrap";'
  },
  env: {
    API_BASE_URL: 'http://localhost:3000/api'
  },
  images: {
    domains: [
      'images.unsplash.com',
      's3-us-west-2.amazonaws.com'
    ],
  },
};
