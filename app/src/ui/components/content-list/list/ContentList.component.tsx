import React, { useState } from 'react';

import ContentListItem from '@/ui/components/content-list/item/ContentListItem.component';
import Pagination from '@/ui/components/pagination/Pagination';

import styles from './content-list.module.scss';

import { posts } from '@/utils/dummy/posts';

type Props = {
  title: string
  vertical?: boolean
  prependEl?: React.ReactElement
  withPagination?: boolean
};

// TODO: Add classnames

const ContentList: React.FC<Props> = ({
  title,
  vertical = false,
  prependEl,
  withPagination = false
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>

      {prependEl}

      <div className={styles.list} style={{
        gridTemplateColumns: vertical ? '1fr' : ''
      }}>
        {posts.map((post) => <ContentListItem
          key={post.id}
          title={post.title}
          img={post.img}
          description={post.description}
          link={`/blog/posts/${post.id}`}
        />)}
      </div>

      {withPagination && <Pagination
        pagesCount={posts.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />}
    </div>
  );
};

export default ContentList;
