import type { NextApiRequest, NextApiResponse } from 'next';

import getOneContentItemCommand from '@/api/useCases/contentItem/getOne/command';
import getOneContentItemHandler from '@/api/useCases/contentItem/getOne/handler';

import CustomError from '@/api/errors/customError';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const slug: string | null = req.query.slug as string | null;

  // TODO: Add middleware
  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!slug) {
    return res.status(400).json({
      error: 'Content slug required.'
    });
  }

  try {
    const article = await getOneContentItemHandler(new getOneContentItemCommand(
      slug
    ));

    if (!article) {
      return res.status(404).json({
        error: 'Content not found.'
      });
    }

    return res.status(200).json(article);
  } catch (e) {
    if ((e as Error).name === 'CustomError') {
      return res.status(400).json({
        message: (e as Error).message
      });
    }

    return res.status(500).json({
      message: (e as Error).message
    });
  }
}