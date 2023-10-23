import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

import styles from './header.module.scss';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.aboutme}>
          <Image
            draggable={false}
            className={styles.avatar}
            width={40}
            height={40}
            src="https://avatars.githubusercontent.com/u/51407990?v=4"
            alt="me"
          />
          <div className={styles.name}>Rasul Arslanov</div>
        </a>
      </Link>

      <ul className={styles.list}>
        <li className={`${styles.item} ${router.pathname === '/' ? styles.active : ''}`}>
          <Link href="/">
            <a>
              <span className={styles.num}>01</span>&nbsp;
              {getText(router.locale, 'home')}
            </a>
          </Link>
        </li>
        <li className={`${styles.item} ${router.pathname === '/notes' ? styles.active : ''}`}>
          <Link href="/notes">
            <a>
              <span className={styles.num}>02</span>&nbsp;
              {getText(router.locale, 'notes')}
            </a>
          </Link>
        </li>
        <li className={`${styles.item} ${router.pathname === '/projects' ? styles.active : ''}`}>
          <Link href="/projects">
            <a>
              <span className={styles.num}>03</span>&nbsp;
              {getText(router.locale, 'projects')}
            </a>
          </Link>
        </li>
        <li className={`${styles.item} ${router.pathname === '/contact' ? styles.active : ''}`}>
          <Link href="/contact">
            <a>
              <span className={styles.num}>04</span>&nbsp;
              {getText(router.locale, 'contact')}
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
