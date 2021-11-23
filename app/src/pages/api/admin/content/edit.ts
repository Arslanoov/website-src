import type { NextApiRequest, NextApiResponse } from 'next';

import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

import editHandler from '@/api/useCases/contentItem/edit/handler';
import editCommand from '@/api/useCases/contentItem/edit/command';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const id: string = req.body.id ?? '';
  const title: string = req.body.title ?? '';
  const description: string = req.body.description ?? '';
  const content: string = req.body.content ?? '';
  const rawContent: string = req.body.rawContent ?? '';
  const lang: string = req.body.lang ?? '';
  const type: string = req.body.type ?? '';
  const cover: string = req.body.cover ?? null;

  try {
    await editHandler(new editCommand(
      id,
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