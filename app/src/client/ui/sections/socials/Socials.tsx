import React from 'react';

import styles from './socials.module.scss';

const Socials = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <a
          href="https://www.linkedin.com/in/arslanoov/"
          target="_blank"
          rel="noreferrer"
        >
          Linked<span className={styles.colored}>in</span>
        </a>
      </li>
      <li className={styles.item}>
        <a
          href="https://github.com/Arslanoov"
          target="_blank"
          rel="noreferrer"
        >
          Git<span className={styles.colored}>Hub</span>
        </a>
      </li>
      <li className={styles.item}>
        <a
          href="https://career.habr.com/arslanoov"
          target="_blank"
          rel="noreferrer"
        >
          Habr<span className={styles.colored}>Career</span>
        </a>
      </li>
      <li className={styles.item}>
        <a href="mailto:rasul@arslanoov.red">
          rasul@arslanoov<span className={styles.colored}>.red</span>
        </a>
      </li>
    </ul>
  );
};

export default Socials;
