import React from 'react';

import Link from 'next/link';

import styles from './content-list-item.module.scss';

type Props = {
  title: string,
  description: string,
  link: string,
  img?: string
};

const ContentListItem: React.FC<Props> = ({
  title,
  description,
  link,
  img = null
}) => {
  return (
    <div className={styles.item}>
      <Link href={link}>
        <a><h3 className={styles.title}>{title}</h3></a>
      </Link>
      {img && <img
        className={styles.image}
        src={img}
        alt={title}
        draggable={false}
      />}
      <div className={styles.description}>{description}</div>
      <Link href={link}>
        <a className={styles.link}>View {'->'}</a>
      </Link>
    </div>
  );
};

export default ContentListItem;
