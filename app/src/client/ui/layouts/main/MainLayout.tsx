import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

import { debounce } from '@/app/utils/debounce';
import { updateHeight } from '@/app/utils/window/updateHeight';
import { generateRandomNumber } from '@/app/utils/random-number';

import Header from '@/ui/sections/header/Header';
import Socials from '@/ui/sections/socials/Socials';

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
  const [randomNumber, setRandomNumber] = useState<number>(undefined);

  useEffect(() => {
    setRandomNumber(isAdmin ? 2 : generateRandomNumber(1, 6));

    const func = debounce(updateHeight);
    window.addEventListener('resize', func);
    updateHeight();

    return () => window.removeEventListener('resize', func);
  }, [isAdmin]);

  return (
    <div>
      <Head>
        <title>{title ?? 'Rasul Arslanov'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Frontend developer website." />
        <meta name="yandex-verification" content="c6e27706431d2eba" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div
        style={{
          backgroundImage: randomNumber && `url(/img/background/${randomNumber}.svg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        className="container"
      >
        <div
          className={styles.layout}
        >
          <Header />

          <main>
            {children}
          </main>

          <Socials />
        </div>
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
