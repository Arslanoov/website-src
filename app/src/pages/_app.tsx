import '@/ui/styles/main.scss';

import type { AppProps } from 'next/app';

import MainLayout from '@/ui/layouts/main/MainLayout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default App;
