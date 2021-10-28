import { MikroORM } from '@mikro-orm/core';

import config from '@/api/config/mikroOrm';

import 'reflect-metadata';

const initOrm = async (): Promise<MikroORM> => MikroORM.init(config);

export default initOrm;