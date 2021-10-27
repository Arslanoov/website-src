import initDb from '@/api/utils/database/init';

import { User } from '@/api/model/user/user';

import PasswordManager from '@/api/services/password-manager/passwordManager';

import Command from './command';

const handler = async ({ username, password }: Command): Promise<User> => {
  const { em } = await initDb();
  const manager = new PasswordManager();

  const hash = await manager.hash(password);
  const user = User.newAdmin(username, hash);

  em.persist(user);
  await em.flush();

  return user;
};

export default handler;