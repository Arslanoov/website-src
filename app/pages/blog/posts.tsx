import type { NextPage } from 'next';

import ContentList from '../../ui/components/content-list/list/ContentList';

import styles from '../../styles/pages/posts.module.scss';

const Posts: NextPage = () => {
  return (
    <div className={'container'}>
      <div className={styles.content}>
        <ContentList vertical={false} title="Recent posts" />
      </div>
    </div>
  );
};

export default Posts;
