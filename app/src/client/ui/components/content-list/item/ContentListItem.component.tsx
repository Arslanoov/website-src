import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

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
  const { locale } = useRouter();

  return (
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
        <Link href={link}>
          <a className={styles.link}>{getText(locale, 'View')} {'->'}</a>
        </Link>
      </div>
    </div>
  );
};

export default ContentListItem;
