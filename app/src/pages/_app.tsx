import '@/ui/styles/main.scss';

import type { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';

import { m, domAnimation, AnimatePresence, LazyMotion } from 'framer-motion';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

const variants = {
  initial: {
    opacity: 0,
    left: '-100%',
    scale: 0.8
  },
  animate: {
    opacity: 1,
    left: 0,
    scale: 1
  },
  exit: {
    opacity: 0,
    left: '100%',
    scale: 1
  }
};

const transition = {
  duration: 0.5
};

const App = ({ Component, router, pageProps: { session, ...pageProps }}: AppPropsWithLayout) => {
  const url = `${process.env.SITE_URL}${router.route}`;

  const getLayout = Component.getLayout || ((page) => page);

  const layoutPage = getLayout(<Component {...pageProps} key={url} />);

  return (
    <SessionProvider session={session}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter={true} >
          <m.div
            key={`${process.env.SITE_URL}${router.route}`}
            className="page-wrap"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {layoutPage}
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </SessionProvider>
  );
};

export default App;
