import type { NextPage } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButtonComponent from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={`container ${styles['content-container']}`}>
      <div className={styles.blog}>
        <ContentListComponent
          items={[]}
          vertical={true}
          prependEl={
            <div className={styles.button}>
              <ContentMoreButtonComponent link="/articles" />
            </div>
          }
          title="Recent posts"
          baseUrl="/articles"
        />
      </div>

      <div className={styles.works}>
        <ContentListComponent
          items={[]}
          vertical={true}
          prependEl={
            <div className={styles.button}>
              <ContentMoreButtonComponent link="/projects" />
            </div>
          }
          title="Recent projects"
          baseUrl="/projects"
        />
      </div>
    </div>
  );
};

export default Home;
