import '@/ui/styles/main.scss';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import MainLayout from '@/ui/layouts/main/MainLayout';

const App = ({ Component, pageProps: { session, ...pageProps }, }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
};

export default App;
