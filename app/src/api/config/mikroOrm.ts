import { Options } from '@mikro-orm/core';

type DatabaseType = 'mongo' | 'mysql' | 'mariadb' | 'postgresql' | 'sqlite' | undefined

const config: Options = {
  dbName: process.env.DB_NAME,
  type: process.env.DB_TYPE as DatabaseType,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ['../model'],
  debug: process.env.NODE_ENV === 'development',
};

export default config;