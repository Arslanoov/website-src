import type { NextApiRequest, NextApiResponse } from 'next';

import signUpHandler from '@/api/useCases/user/signUp/handler';
import signUpCommand from '@/api/useCases/user/signUp/command';
import CustomError from '@/api/errors/customError';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  const username: string | null = req.body.username;
  const password: string | null = req.body.password;

  // TODO: Add middleware
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

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