import React from 'react';

import Link from 'next/link';

import styles from './content-list-item.module.scss';
import {dateFormatter} from '@/app/utils/date/formatter';

type Props = {
  title: string,
  link: string,
  createdAt: string,
  locale: string,
};

const ContentListItem: React.FC<Props> = ({
  title,
  link,
  createdAt,
  locale
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.item}>
        <div className={styles.content}>
          <Link href={link}>
            <a><h3 className={styles.title}>{title}</h3></a>
          </Link>
          <div className={styles.date}>{dateFormatter(createdAt, locale)}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentListItem;
