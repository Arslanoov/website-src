import { getEntityManager } from '@/api/utils/database/getEntityManager';

import { User } from '@/api/model/user/user';

import PasswordManager from '@/api/services/password-manager/passwordManager';

import CredentialsError from '@/api/errors/credentialsError';

import Command from './command';

const handler = async (command: Command) => {
  const em = await getEntityManager();
  
  const users = em.getRepository(User);
  const user: User | null = await users.findOne({
    username: command.username
  });
  
  if (!user) {
    throw new CredentialsError();
  }
  
  const passwordManager = new PasswordManager();
  await passwordManager.verify(command.password, user.password);

  return user;
};

export default handler;