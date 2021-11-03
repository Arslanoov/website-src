import React from 'react';

import styles from './pagination.module.scss';

type Props = {
  pagesCount: number
  currentPage: number
  onPageChange: (index: number) => void
};

const Pagination: React.FC<Props> = ({ pagesCount, currentPage, onPageChange }) => {
  const list = [];
  for (let i = 0; i < pagesCount; i++) {
    list.push(<button
      className={styles.item}
      disabled={currentPage === i + 1}
      key={i}
      onClick={() => onPageChange(i)}
    >
      {i + 1}
    </button>);
  }

  return (
    <div className={styles.list}>
      {list}
    </div>
  );
};

export default Pagination;
