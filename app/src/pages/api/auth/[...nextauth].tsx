import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import getUserCommand from '@/api/useCases/user/get/command';
import getUserHandler from '@/api/useCases/user/get/handler';

export default NextAuth({
  secret: process.env.SECRET,
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    // TODO: Remove ts ignore
    // TODO: Remove any
    async signIn(credentials: any) {
      // TODO: Add enum for role
      return credentials.user.id && credentials.user.role === 'Admin';
    },
    // @ts-ignore
    async session(credentials) {
      if (credentials) {
        // @ts-ignore
        credentials.session.user = credentials.token.token.user;
      }
      return credentials;
    },
    // @ts-ignore
    async jwt(token, user) {
      if (user) token.user = user;
      return token;
    },
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
            id: user.id.value,
            username: user.username,
            role: user.role
          };
        } catch (e) {
          console.log('ERR', e.message);
          throw new Error(e.message);
        }
      }
    })
  ],
});
