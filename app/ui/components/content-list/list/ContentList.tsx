import React from 'react';

import ContentListItem from '../item/ContentListItem';

import styles from './content-list.module.scss';

import { posts } from '../../../dummy/posts';

type Props = {
  title: string
  vertical?: boolean
};

// TODO: Add classnames

const ContentList: React.FC<Props> = ({ title, vertical = false }) => {
  return (
    <div>
      <div className={styles.title}>{title}</div>
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
    </div>
  );
};

export default ContentList;
