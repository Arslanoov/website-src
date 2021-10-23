import { MikroORM } from '@mikro-orm/core';

// TODO: Remove
type DatabaseType = 'mongo' | 'mysql' | 'mariadb' | 'postgresql' | 'sqlite' | undefined

export const connect = async () => {
  const orm = await MikroORM.init({
    entities: ['../model'],
    dbName: process.env.DB_NAME,
    type: process.env.DB_TYPE as DatabaseType,
    clientUrl: process.env.DB_URL
  });

  console.log(orm.em);

  return orm;
};