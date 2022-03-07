import React from 'react';

import Link from 'next/link';

import styles from './header.module.scss';

const Header = () => {
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
              <a><span className={styles.counter}>01.</span> Projects</a>
            </Link>
          </li>
          <li className={styles.item}>
            <Link href="/content/blog">
              <a><span className={styles.counter}>02.</span> Articles</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
