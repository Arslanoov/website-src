import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

import { Language } from '@/domain/content/contentItem';

import Header from '@/ui/components/header/Header.component';

import styles from './main-layout.module.scss';

type Props = {
  title?: string | null,
  isAdmin?: boolean
};

const MainLayout: React.FC<Props> = ({
  children,
  title = null,
  isAdmin = false
}) => {
  /* useEffect(() => {
    const func = debounce(updateHeight);
    window.addEventListener('resize', func);
    return () => window.removeEventListener('resize', func);
  }, []); */

  const { locale } = useRouter();

  return (
    <div>
      <Head>
        <title>{title ?? (locale === Language.russian ? 'Расуль Арсланов' : 'Rasul Arslanov')}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description"
          content={
            locale === Language.russian ?
              'Фронтенд разработчик. Превращаю макеты в работающие веб приложения. 4+ лет коммерческого опыта.' :
              'Frontend developer with 4+ years of commercial experience. Turn layouts into working web applications.'
          }
        />
        <meta name="yandex-verification" content="c6e27706431d2eba" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className={styles.layout}>
        <main className="container">
          <Header />
        </main>

        {children}
      </div>

      {process.env.NODE_ENV === 'production' && !isAdmin && <>
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(m,e,t,r,i,k,a) {
              m[i]=m[i] || function() {
                (m[i].a=m[i].a||[]).push(arguments)
              };
              m[i].l=1*new Date();
              k=e.createElement(t), a=e.getElementsByTagName(t)[0],
              k.async=1, k.src=r, a.parentNode.insertBefore(k,a)}
            )(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(86750287, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `
          }}
        />

        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/86750287" style={{
              position: 'absolute',
              left: '-9999px'
            }} alt="" />
          </div>
        </noscript>
      </>}
    </div>
  );
};

export default MainLayout;
