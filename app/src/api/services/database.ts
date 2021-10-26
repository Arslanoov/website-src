import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';

import config from '@/api/config/mikroOrm';

const initOrm = async () => MikroORM.init(config);

export default initOrm;