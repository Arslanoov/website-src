import axios from 'axios';

import ConfigError from '@/app/errors/configError';

if (!process.env.API_BASE_URL) {
  throw new ConfigError('API Base url required');
}

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.API_BASE_URL
});

export default instance;