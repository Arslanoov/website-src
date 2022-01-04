import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { initORM } from '@/api/utils/database/initORM';

import { AUTH_AGE } from '@/api/config/auth';

import { Role } from '@/api/model/user/role';

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
    maxAge: AUTH_AGE
  },
  callbacks: {
    async signIn({ user }) {
      return user.id && user.role === Role.Admin;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
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
          const orm = await initORM();

          const user = await getUserHandler(
            new getUserCommand(credentials.username, credentials.password)
          );

          return {
            id: user.id.value,
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
