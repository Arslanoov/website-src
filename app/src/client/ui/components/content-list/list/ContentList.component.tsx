import React from 'react';

import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

import { PaginatedContentItems } from '@/domain/content/contentItem';

import ContentListItem from '@/ui/components/content-list/item/ContentListItem.component';
import Pagination from '@/ui/components/pagination/Pagination';

import styles from './content-list.module.scss';

type Props = {
  title: string
  baseUrl: string
  paginationUrl?: string
  paginatedItems: PaginatedContentItems
  vertical?: boolean
  withPagination?: boolean
  currentPage?: number
  prependEl?: React.ReactElement
};

const ContentList: React.FC<Props> = ({
  title,
  baseUrl,
  paginatedItems,
  vertical = false,
  withPagination = false,
  currentPage = 1,
  paginationUrl = '',
  prependEl
}) => {
  const { locale } = useRouter();

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{getText(locale, title)}</h3>

      {prependEl}

      {paginatedItems.items.length === 0 ? <div className={styles['not-found']}>
        <p>{getText(locale, 'nothing-here')}</p>
        <p>
          {getText(locale, 'smth-interesting')} <a
            className={styles.link}
            href="https://github.com/Arslanoov"
            target="blank"
          >
             GitHub
          </a>?
        </p>
      </div>: <>
        <div className={styles.list} style={{
          gridTemplateColumns: vertical ? '1fr' : ''
        }}>
          {paginatedItems.items.map((item) => <ContentListItem
            key={item.id}
            title={item.title}
            description={item.description}
            link={`${baseUrl}/${item.slug}`}
          />)}
        </div>

        {withPagination && <Pagination
          pagesCount={Number(paginatedItems.totalCount) / Number(paginatedItems.perPage)}
          currentPage={currentPage}
          url={paginationUrl}
        />}
      </>}
    </div>
  );
};

export default ContentList;
