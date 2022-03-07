import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getText } from '@/app/utils/i18n/helper';

import { Language } from '@/domain/content/contentItem';

import styles from './header.module.scss';

const Header = () => {
  const { locale, asPath } = useRouter();

  return (
    <div className="container">
      <div className={styles.header}>
        <ul className={styles.list}>
          {/* <li className={styles.item}>
            <Link href="/about">
              <a><span className={styles.counter}>01.</span> About</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/experience">
              <a><span className={styles.counter}>02.</span> Experience</a>
            </Link>
          </li> */}
          <li className={styles.item}>
            <Link href="/content/projects">
              <a><span className={styles.counter}>01. </span>{getText(locale, 'Projects')}</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/content/blog">
              <a><span className={styles.counter}>02. </span>{getText(locale, 'Articles')}</a>
            </Link>
          </li>
          <li className={styles.item}>
            <span className={styles.counter}>03. </span>
            <Link
              locale={locale === Language.english ? Language.russian : Language.english}
              href={asPath}
            >
              <a>
                {locale.toUpperCase()} {'-> '}
                {
                  (locale === Language.english ?
                    Language.russian :
                    Language.english).toUpperCase()
                }
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
