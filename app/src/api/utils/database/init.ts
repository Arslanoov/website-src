import 'reflect-metadata';

import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import config from '@/api/config/mikroOrm';

const initOrm = async (): Promise<MikroORM<PostgreSqlDriver>> => MikroORM.init<PostgreSqlDriver>(config);

export default initOrm;