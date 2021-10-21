import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import styles from './content-list-item.module.scss';

type Props = {
  title: string,
  description: string,
  link: string,
  img?: string
};

const ContentListItem: React.FC<Props> = ({ title, description, link, img = null }) => {
  return (
    <div className={styles.item}>
      <div className={styles.title}>{title}</div>
      {img && <div className={styles.wrapper}>
        <Image
          className={styles.image}
          src={img}
          alt={title}
          draggable={false}
          layout="fill"
        />
      </div>}
      <div className={styles.description}>{description}</div>
      <Link href={link}>
        <a className={styles.link}>View {'->'}</a>
      </Link>
    </div>
  );
};

export default ContentListItem;
