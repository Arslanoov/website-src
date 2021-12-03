import '@/ui/styles/main.scss';

import type { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

const App = ({ Component, pageProps: { session, ...pageProps }}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  const layoutPage = getLayout(<Component {...pageProps} />);

  return (
    <SessionProvider session={session}>
      {layoutPage}
    </SessionProvider>
  );
};

export default App;
