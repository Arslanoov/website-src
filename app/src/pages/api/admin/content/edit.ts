import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';

import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

import { SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';

import editHandler from '@/api/useCases/contentItem/edit/handler';
import editCommand from '@/api/useCases/contentItem/edit/command';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // TODO: Add middleware
  const session = await getSession({ req });
  if (!session?.user) {
    return res.status(401).end('Unauthenticated');
  }
  
  const user = session.user as SessionUserInterface;
  if (user.role !== UserRole.Admin) {
    return res.status(403).end('Access denied');
  }

  const { id = '', title = '', description = '', content = '', rawContent = '', lang = '', type = '', cover = null }: {
    [key: string]: string | null
  } = req.body;

  try {
    await editHandler(new editCommand(
      id,
      user.id,
      title,
      description,
      content,
      rawContent,
      lang as Language,
      type as Type,
      cover
    ));

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