import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { RequestContext } from '@mikro-orm/core';

import { initORM } from '@/api/utils/database/initORM';

export const withORM = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const orm = await initORM();
  return RequestContext.createAsync(orm.em, async () => await handler(req, res));
};