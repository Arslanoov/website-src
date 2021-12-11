import React from 'react';

import Link from 'next/link';

import { LanguageType } from '@/domain/content/contentItem';

import { getText } from '@/app/utils/i18n/helper';

import styles from './about-me.module.scss';

type Props = {
  lang: LanguageType
};

const AboutMe: React.FC<Props> = ({ lang }) => {
  return (
    <div className={`container ${styles['about-container']}`}>
      <div className={styles.left}>
        <img className={styles.avatar} src="/img/me.jpg" alt=""/>
        <h1 className={styles.name}>{getText(lang, 'about-me-name')}</h1>
        <div className={styles['short-description']}>Frontend Developer</div>
      </div>
      <div className={styles.right}>
        <p className={styles.paragraph}>
          {getText(lang, 'about-me-p1')}
        </p>
        <p className={styles.paragraph}>
          {getText(lang, 'about-me-articles')}
          (
          <Link href="/content/blog">
            <a className={styles.link}>{getText(lang, 'about-me-click')}</a>
          </Link>
          )
          {getText(lang, 'about-me-reviews')}
          (
          <Link href="/content/projects">
            <a className={styles.link}>{getText(lang, 'about-me-click')}</a>
          </Link>
          ).
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
