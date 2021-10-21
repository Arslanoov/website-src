import type { NextPage } from 'next';

import styles from '@/ui/styles/pages/home.module.scss';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButtonComponent from '@/ui/components/content-list/more-button/ContentMoreButton.component';

const Home: NextPage = () => {
  return (
    <div className={`container ${styles['content-container']}`}>
      <div className={styles.blog}>
        <ContentListComponent title="Recent posts" vertical={true} />
        <div className={styles.button}>
          <ContentMoreButtonComponent link='/blog/posts' />
        </div>
      </div>

      <div className={styles.works}>
        <ContentListComponent title="Portfolio" vertical={true} />
        <div className={styles.button}>
          <ContentMoreButtonComponent link='/portfolio' />
        </div>
      </div>
    </div>
  );
};

export default Home;
