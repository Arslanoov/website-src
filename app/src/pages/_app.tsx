import '@/ui/styles/main.scss';

import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Router from 'next/router';

import { SessionProvider } from 'next-auth/react';

import ym, { YMInitializer } from 'react-yandex-metrika';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

Router.events.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined') {
    ym('hit', url);
  }
});

const App = ({ Component, pageProps: { session, ...pageProps }}: AppPropsWithLayout) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.pathname + window.location.search;
      ym('hit', url);
    }
  }, []);


  const getLayout = Component.getLayout || ((page) => page);

  const layoutPage = getLayout(<Component {...pageProps} />);

  return (
    <>
      <YMInitializer
        accounts={[parseInt(process.env.YM_COUNTER_ID as string)]}
        options={{
          webvisor: true
        }}
        version="2"
      />
      <SessionProvider session={session}>
        {layoutPage}
      </SessionProvider>
    </>
  );
};

export default App;
