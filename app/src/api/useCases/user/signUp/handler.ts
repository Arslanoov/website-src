import initDb from '@/api/services/database/init';

import { User } from '@/api/model/user/user';

import { Command } from './command';

const handler = async ({ username, password }: Command): Promise<User> => {
  const { em } = await initDb();

  const user = User.newAdmin(username, password);

  em.persist(user);
  await em.flush();

  return user;
};

export default handler;