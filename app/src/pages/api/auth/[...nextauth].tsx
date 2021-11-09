import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import getUserCommand from '@/api/useCases/user/get/command';
import getUserHandler from '@/api/useCases/user/get/handler';

export default NextAuth({
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const user = await getUserHandler(
            new getUserCommand(credentials.username, credentials.password)
          );
          return {
            id: user.id,
            username: user.username,
            role: user.role
          };
        } catch (e) {
          throw new Error(e.message);
        }
      }
    })
  ],
});