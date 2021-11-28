import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';

import CustomError from '@/api/errors/customError';

import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

import { SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';

import getAllContentItemsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllContentItemsHandler from '@/api/useCases/contentItem/getAll/handler';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getSession({ req });
  if (!session?.user) {
    return res.status(401).end('Unauthenticated');
  }
  if ((session.user as SessionUserInterface).role !== UserRole.Admin) {
    return res.status(403).end('Access denied');
  }

  const lang: Language = (req.query.lang ?? 'en') as Language;
  const type: Type = (req.query.type ?? '') as Type;
  const page: number = Number(req.query.page) ?? 1;

  try {
    const contentItems = await getAllContentItemsHandler(new getAllContentItemsCommand(
      page,
      lang,
      type,
      true
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