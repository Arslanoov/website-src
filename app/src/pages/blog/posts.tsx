import type { NextPage } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/posts.module.scss';

const Posts: NextPage = () => {
  return (
    <div className={'container'}>
      <div className={styles.content}>
        <div className={styles.button}>
          <ContentMoreButton text="Go back" link="/" />
        </div>
        <ContentListComponent vertical={false} withPagination={true} title="Recent posts" />
      </div>
    </div>
  );
};

export default Posts;
