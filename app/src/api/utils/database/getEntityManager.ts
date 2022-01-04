import type { PostgreSqlDriver } from '@mikro-orm/postgresql';
import type { SqlEntityManager, EntityManager } from '@mikro-orm/knex';

import { RequestContext } from '@mikro-orm/core';

import { initORM } from '@/api/utils/database/initORM';

type EntityManagerType = SqlEntityManager<PostgreSqlDriver> & EntityManager;

export const getEntityManager = async (): Promise<EntityManagerType> => {
  let em = RequestContext.getEntityManager() as EntityManagerType;
  if (!em) {
    const orm = await initORM();
    em = orm.em;
  }
  return em;
};