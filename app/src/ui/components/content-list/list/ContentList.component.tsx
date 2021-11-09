import React from 'react';

import ContentListItem from '@/ui/components/content-list/item/ContentListItem.component';
import Pagination from '@/ui/components/pagination/Pagination';

import { PaginatedContentItems } from '@/domain/content/contentItem';

import styles from './content-list.module.scss';

type Props = {
  title: string
  baseUrl: string
  paginatedItems: PaginatedContentItems
  vertical?: boolean
  withPagination?: boolean
  currentPage?: number
  setCurrentPage?: (page: number) => void
  prependEl?: React.ReactElement
};

// TODO: Add classnames

const ContentList: React.FC<Props> = ({
  title,
  baseUrl,
  paginatedItems,
  vertical = false,
  withPagination = false,
  currentPage = 1,
  setCurrentPage = () => {},
  prependEl
}) => {
  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>

      {prependEl}

      <div className={styles.list} style={{
        gridTemplateColumns: vertical ? '1fr' : ''
      }}>
        {paginatedItems.items.map((item) => <ContentListItem
          key={item.id}
          title={item.title}
          img={item.cover}
          description={item.description}
          link={`${baseUrl}/${item.slug}`}
        />)}
      </div>

      {withPagination && <Pagination
        pagesCount={Number(paginatedItems.totalCount) / Number(paginatedItems.perPage)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />}
    </div>
  );
};

export default ContentList;
