import React from 'react';

import Link from 'next/link';

import styles from './pagination.module.scss';

type Props = {
  pagesCount: number
  currentPage: number
  url: string
};

const Pagination: React.FC<Props> = ({ pagesCount, currentPage, url }) => {
  const list = [];
  for (let i = 0; i < Math.max(pagesCount, 1); i++) {
    list.push(<Link
      href={currentPage === i + 1 ? '#' : `${url}?page=${i + 1}`}
      key={i}
    >
      <a className={`${styles.item} ${currentPage === i + 1 ? styles.disabled : false}`}>{i + 1}</a>
    </Link>);
  }

  return (
    <div className={styles.list}>
      {list}
    </div>
  );
};

export default Pagination;
