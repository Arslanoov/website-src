import type { NextApiRequest, NextApiResponse } from 'next';

import { withORM } from '@/api/utils/database/withORM';

import removeContentItemCommand from '@/api/useCases/contentItem/remove/command';
import removeContentItemHandler from '@/api/useCases/contentItem/remove/handler';

import CustomError from '@/api/errors/customError';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string = (req.query.id ?? '') as string;

  if (req.method !== 'DELETE') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await removeContentItemHandler(new removeContentItemCommand(id));
    return res.status(204).end();
  } catch (e) {
    if ((e as Error).name === 'CustomError') {
      return res.status(400).json({
        message: (e as Error).message
      });
    }

    return res.status(500).json({
      message: 'Unknown error'
    });
  }
}

export default withORM(handler);