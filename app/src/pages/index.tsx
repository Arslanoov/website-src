import type { GetServerSideProps, NextPage } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButtonComponent from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/home.module.scss';

import { Language } from '@/api/model/content/item/lang';
import { PaginatedContentItems } from '@/domain/content/contentItem';

import getLatestArticlesHandler from '@/api/useCases/articles/getLatest/handler';
import getLatestArticlesCommand from '@/api/useCases/articles/getLatest/command';

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await getLatestArticlesHandler(new getLatestArticlesCommand(Language.en, false));

  return {
    props: {
      articles
    }
  };
};

type Props = {
  articles: PaginatedContentItems
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <div className={`container ${styles['content-container']}`}>
      <div className={styles.blog}>
        <ContentListComponent
          paginatedItems={articles}
          vertical={true}
          prependEl={
            <div className={styles.button}>
              <ContentMoreButtonComponent link="/blog" />
            </div>
          }
          title="Recent posts"
          baseUrl="/blog"
        />
      </div>

      <div className={styles.works}>
        <ContentListComponent
          paginatedItems={articles}
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
