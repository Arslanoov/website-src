import type { NextApiRequest, NextApiResponse } from 'next';

import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

import getAllContentItemsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllContentItemsHandler from '@/api/useCases/contentItem/getAll/handler';

import CustomError from '@/api/errors/customError';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const lang: Language = (req.query.lang ?? '') as Language;
  const type: Type = (req.query.type ?? '') as Type;
  const page: number = Number(req.query.page) ?? 1;

  // TODO: Add middleware
  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const contentItems = await getAllContentItemsHandler(new getAllContentItemsCommand(
      page,
      lang,
      type,
      false
    ));

    return res.status(200).json(contentItems);
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