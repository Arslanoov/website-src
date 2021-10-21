import type { NextPage } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';

import styles from '@/ui/styles/pages/posts.module.scss';

const Posts: NextPage = () => {
  return (
    <div className={'container'}>
      <div className={styles.content}>
        <ContentListComponent vertical={false} title="Recent posts" />
      </div>
    </div>
  );
};

export default Posts;
