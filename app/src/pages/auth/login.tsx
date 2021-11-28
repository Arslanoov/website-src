import type { GetServerSideProps } from 'next';
import Router from 'next/router';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { signIn, useSession, getProviders, getCsrfToken } from 'next-auth/react';

import MainLayout from '@/ui/layouts/main/MainLayout';

import styles from '@/ui/styles/pages/auth/login.module.scss';

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return {
    props: {
      providers,
      csrfToken
    }
  };
};

type Props = {
  providers: Record<LiteralUnion<string>, ClientSafeProvider>,
  csrfToken: string
};

export default function Login({ providers, csrfToken }: Props) {
  const session = useSession();

  const credentialsProvider = providers.credentials;

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (session.data) {
    Router.push('/');
    return <div />;
  }

  return (
    <div className="container">
      <div className={styles.login}>
        <h1 className={styles.title}>Auth</h1>

        <div className={styles.form}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <div className={styles.group}>
            <label className={styles.label} htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.input}
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.group}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={() => signIn(credentialsProvider.id, {
              username,
              password
            })}
            className={styles.submit}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = (page) => <MainLayout>{page}</MainLayout>;
