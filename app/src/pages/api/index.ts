import type { NextApiRequest, NextApiResponse } from 'next';
import PasswordManager from '@/api/services/password-manager/passwordManager';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manager = new PasswordManager();
  const hash = await manager.hash('fd7ced51e25ad9c7ec0709038b660b50');

  res.status(200).json({
    v: '1.0',
    hash
  });
}
