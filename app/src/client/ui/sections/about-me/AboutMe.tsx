import React from 'react';

import styles from './about-me.module.scss';

const AboutMe = () => {
  const onPortfolioClick = () => window.open(
    'https://github.com/Arslanoov',
    '_blank',
    'noopener, noreferrer'
  );

  return (
    <>
      <h1 className={styles.name}>
        Rasul Arslanov.
      </h1>
      <h2 className={styles.profession}>
        Frontend Developer
      </h2>
      <p className={styles.description}>
        I build things for the web.
      </p>
      <button onClick={onPortfolioClick} className={styles.button}>
        Check out my github!
      </button>
    </>
  );
};

export default AboutMe;
