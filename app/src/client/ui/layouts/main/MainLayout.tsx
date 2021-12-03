import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

import Header from '@/ui/components/header/Header.component';

import styles from './main-layout.module.scss';

const MainLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Arslanoov</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Red" />
        <meta name="yandex-verification" content="c6e27706431d2eba" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.layout}>
        <Header />

        <main>
          {children}
        </main>
      </div>

      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `<script type="text/javascript" >
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
          </script>
          <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/86750287" style="position:absolute; left:-9999px;" alt="" />
          </div>
          </noscript>`
        }}
      />
    </div>
  );
};

export default MainLayout;
