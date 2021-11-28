import 'reflect-metadata';

import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import config from '@/api/config/mikroOrm';

const initOrm = async (): Promise<MikroORM<PostgreSqlDriver>> => {
  console.log('config');
  return MikroORM.init<PostgreSqlDriver>(config);
};

export default initOrm;