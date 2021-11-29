import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';

import { SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';

import signUpHandler from '@/api/useCases/contentItem/create/handler';
import signUpCommand from '@/api/useCases/contentItem/create/command';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getSession({ req });
  if (!session?.user) {
    return res.status(401).end('Unauthenticated');
  }

  const user = session.user as SessionUserInterface;
  if (user.role !== UserRole.Admin) {
    return res.status(403).end('Access denied');
  }

  const { title = '', description = '', rawContent = '', type = '', lang = '', cover = null }: {
    [key: string]: string | null
  } = req.body;

  try {
    await signUpHandler(new signUpCommand(
      user.id,
      title,
      description,
      rawContent,
      type,
      lang,
      cover ?? null
    ));

    return res.status(201).end();
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