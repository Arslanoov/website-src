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
    <Link href={link} passHref>
      <div className={`${styles.link} ${styles.item}`}>
        <div className={styles.item}>
          {img && <img
            className={styles.image}
            src={img}
            alt={title}
            draggable={false}
          />}
          <div className={styles.content}>
            <Link href={link}>
              <a><h3 className={styles.title}>{title}</h3></a>
            </Link>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentListItem;
