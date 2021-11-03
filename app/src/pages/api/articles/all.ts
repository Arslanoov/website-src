import type { NextApiRequest, NextApiResponse } from 'next';

import { Language } from '@/api/model/content/item/lang';

import getAllArticlesCommand from '@/api/useCases/articles/getAll/command';
import getAllArticlesHandler from '@/api/useCases/articles/getAll/handler';

import CustomError from '@/api/errors/customError';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const lang: Language = req.body.lang ?? 'en';
  const page: number = Number(req.body.page) ?? 1;

  // TODO: Add middleware
  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const articles = await getAllArticlesHandler(new getAllArticlesCommand(
      lang,
      page,
    ));

    return res.status(200).json(articles);
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