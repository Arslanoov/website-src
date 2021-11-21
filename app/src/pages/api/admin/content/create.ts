import type { NextApiRequest, NextApiResponse } from 'next';

import signUpHandler from '@/api/useCases/contentItem/create/handler';
import signUpCommand from '@/api/useCases/contentItem/create/command';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { authorId, title, description, content, rawContent, type, lang, cover }: {
    [key: string]: string
  } = req.body;

  try {
    await signUpHandler(new signUpCommand(
      authorId,
      title,
      description,
      content,
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