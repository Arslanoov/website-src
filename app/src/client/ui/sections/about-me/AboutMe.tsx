import React from 'react';
import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

import styles from './about-me.module.scss';

const AboutMe = () => {
  const { locale } = useRouter();

  const onPortfolioClick = () => window.open(
    'https://github.com/Arslanoov',
    '_blank',
    'noopener, noreferrer'
  );

  return (
    <>
      <h1 className={styles.name}>
        {getText(locale, 'about-me-name')}.
      </h1>
      <h2 className={styles.profession}>
        Frontend Developer
      </h2>
      <p className={styles.description}>
        {getText(locale, 'about-me-description')}.
      </p>
      <button onClick={onPortfolioClick} className={styles.button}>
        {getText(locale, 'github')}
      </button>
    </>
  );
};

export default AboutMe;
