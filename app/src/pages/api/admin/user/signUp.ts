import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';

import signUpHandler from '@/api/useCases/user/signUp/handler';
import signUpCommand from '@/api/useCases/user/signUp/command';

import CustomError from '@/api/errors/customError';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // TODO: Add middleware
  const session = await getSession({ req });
  if (!session?.user) {
    return res.status(401).end('Unauthenticated');
  }
  if (session.user.role !== 'Admin') {
    return res.status(403).end('Access denied');
  }

  const username: string | null = req.body.username;
  const password: string | null = req.body.password;

  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password required.'
    });
  }

  try {
    const user = await signUpHandler(new signUpCommand(
      username,
      password
    ));

    return res.status(200).json({
      user
    });
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