import type { GetServerSideProps, NextPage } from 'next';

import type { ChangeEvent } from 'react';
import { useState } from 'react';

import type { LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { signIn, useSession, getProviders, getCsrfToken } from 'next-auth/react';

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

// TODO: Remove any
type Props = {
  providers: Record<LiteralUnion<any>, ClientSafeProvider>,
  csrfToken: string
};

const Login: NextPage<Props> = ({ providers, csrfToken }) => {
  const session = useSession();

  const credentialsProvider = providers.credentials;

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (session.data) {
    return <div className={styles.alert}>Already signed in</div>;
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

export default Login;