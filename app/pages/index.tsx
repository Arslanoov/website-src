import type { NextPage } from 'next';

import styles from '../styles/pages/home.module.scss';

import ContentList from '../ui/components/content-list/list/ContentList';
import ContentMoreButton from '../ui/components/content-list/more-button/ContentMoreButton';

const Home: NextPage = () => {
  return (
    <div className={`container ${styles['content-container']}`}>
      <div className={styles.blog}>
        <ContentList title="Recent posts" vertical={true} />
        <div className={styles.button}>
          <ContentMoreButton link='/blog/posts' />
        </div>
      </div>

      <div className={styles.works}>
        <ContentList title="Portfolio" vertical={true} />
        <div className={styles.button}>
          <ContentMoreButton link='/portfolio' />
        </div>
      </div>
    </div>
  );
};

export default Home;
