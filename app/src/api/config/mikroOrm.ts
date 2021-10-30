import dotenv from 'dotenv';

import { Options } from '@mikro-orm/core';

import { User } from '@/api/model/user/user';
import { Author } from '@/api/model/content/author/author';
import { ContentItem } from '@/api/model/content/item/contentItem';

dotenv.config();

type DatabaseType = 'mongo' | 'mysql' | 'mariadb' | 'postgresql' | 'sqlite' | undefined

const config: Options = {
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
  debug: process.env.NODE_ENV === 'development',
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
};

export default config;