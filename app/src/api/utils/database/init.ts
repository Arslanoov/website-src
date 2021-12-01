import 'reflect-metadata';

import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import config from '@/api/config/mikroOrm';

const initOrm = async (): Promise<MikroORM<PostgreSqlDriver>> => {
  if (!global.__MikroORM__) {
    global.__MikroORM__ = await MikroORM.init<PostgreSqlDriver>(config);
  }
  return global.__MikroORM__;
};

export default initOrm;