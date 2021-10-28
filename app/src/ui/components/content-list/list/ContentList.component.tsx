import React, { useState } from 'react';

import ContentListItem from '@/ui/components/content-list/item/ContentListItem.component';
import Pagination from '@/ui/components/pagination/Pagination';

import { ContentItem } from '@/domain/content/contentItem';

import styles from './content-list.module.scss';

type Props = {
  title: string
  baseUrl: string
  items: ContentItem[]
  vertical?: boolean
  withPagination?: boolean
  prependEl?: React.ReactElement
};

// TODO: Add classnames

const ContentList: React.FC<Props> = ({
  title,
  baseUrl,
  items,
  vertical = false,
  withPagination = false,
  prependEl
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>

      {prependEl}

      <div className={styles.list} style={{
        gridTemplateColumns: vertical ? '1fr' : ''
      }}>
        {items.map((item) => <ContentListItem
          key={item.id}
          title={item.title}
          img={item.cover}
          description={item.description}
          link={`${baseUrl}${item.slug}`}
        />)}
      </div>

      {withPagination && <Pagination
        pagesCount={items.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />}
    </div>
  );
};

export default ContentList;
