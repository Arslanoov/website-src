import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

import Footer from '@/ui/components/footer/Footer.component';

import styles from './main-layout.module.scss';

type Props = {
  title?: string
};

const MainLayout: React.FC<Props> = ({
  children,
  title = ''
}) => {
  return (
    <div>
      <Head>
        <title>{title ? `Arslanoov - ${title}` : 'Arslanoov'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Red" />
        <meta name="yandex-verification" content="c6e27706431d2eba" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className={styles.layout}>
        <main>
          {children}
        </main>

        <Footer />
      </div>

      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (d, w, c) {
                (w[c] = w[c] || []).push(function() {
                    try {
                        w.yaCounter86750287 = new Ya.Metrika({
                            id:86750287,
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true
                        });
                    } catch(e) { }
                });
        
                var n = d.getElementsByTagName("script")[0],
                    s = d.createElement("script"),
                    f = function () { n.parentNode.insertBefore(s, n); };
                s.type = "text/javascript";
                s.async = true;
                s.src = "https://mc.yandex.ru/metrika/watch.js";
        
                if (w.opera == "[object Opera]") {
                    d.addEventListener("DOMContentLoaded", f, false);
                } else { f(); }
            })(document, window, "yandex_metrika_callbacks");
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
    </div>
  );
};

export default MainLayout;
