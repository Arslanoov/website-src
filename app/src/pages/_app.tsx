import '@/ui/styles/main.scss';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import type { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

const App = ({ Component, pageProps: { session, ...pageProps }}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
