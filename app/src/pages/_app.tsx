import '@/ui/styles/main.scss';

import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { SessionProvider } from 'next-auth/react';

import { YMInitializer } from 'react-yandex-metrika';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

Router.events.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // @ts-ignore
    ym('hit', url);
  }
});

const App = ({ Component, pageProps: { session, ...pageProps }}: AppPropsWithLayout) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const url = window.location.pathname + window.location.search;
      // @ts-ignore
      ym('hit', url);
    }
  }, []);


  const getLayout = Component.getLayout || ((page) => page);

  const layoutPage = getLayout(<Component {...pageProps} />);

  return (
    <>
      {
        process.env.NODE_ENV === 'production' &&
        <YMInitializer
          accounts={[parseInt(process.env.YM_COUNTER_ID as string)]}
          options={{
            webvisor: true,
            defer: true
          }}
          version="2"
        />
      }
      <SessionProvider session={session}>
        {layoutPage}
      </SessionProvider>
    </>
  );
};

export default App;
