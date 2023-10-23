import React from 'react';

import Link from 'next/link';

import { dateFormatter } from '@/app/utils/date/formatter';

import styles from './content-list-item.module.scss';

type Props = {
  title: string,
  link: string,
  createdAt: string,
  locale: string,
  description: string,
};

const ContentListItem: React.FC<Props> = ({
  title,
  link,
  description,
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
          <p className={styles.description}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentListItem;
