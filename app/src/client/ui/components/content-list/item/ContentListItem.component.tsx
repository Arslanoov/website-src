import React from 'react';

import Link from 'next/link';

import styles from './content-list-item.module.scss';

type Props = {
  title: string,
  description: string,
  link: string,
};

const ContentListItem: React.FC<Props> = ({
  title,
  description,
  link
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.item}>
        <div className={styles.content}>
          <Link href={link}>
            <a><h3 className={styles.title}>{title}</h3></a>
          </Link>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentListItem;
