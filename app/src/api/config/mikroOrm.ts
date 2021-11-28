import dotenv from 'dotenv';

import { ReflectMetadataProvider, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { RedisCacheAdapter } from 'mikro-orm-cache-adapter-redis';

import { User } from '@/api/model/user/user';
import { Author } from '@/api/model/content/author/author';
import { ContentItem } from '@/api/model/content/item/contentItem';

import { REVALIDATE_TIME } from '@/common/config/cache';

dotenv.config();

type DatabaseType = 'mongo' | 'mysql' | 'mariadb' | 'postgresql' | 'sqlite' | undefined;

const config: Options<PostgreSqlDriver> = {
  entities: [
    User,
    Author,
    ContentItem
  ],
  dbName: process.env.DB_NAME,
  type: process.env.DB_TYPE as DatabaseType,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  debug: true,
  metadataProvider: ReflectMetadataProvider,
  /*cache: {
    enabled: true,
  },*/
  migrations: {
    tableName: 'migrations',
    path: 'src/api/utils/database/migrations',
    pattern: /^[\w-]+\d+\.ts$/,
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
  },
  resultCache: {
    adapter: RedisCacheAdapter,
    expiration: REVALIDATE_TIME,
    options: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD
    }
  }
};

export default config;