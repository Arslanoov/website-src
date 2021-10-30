import type { NextPage, GetServerSideProps } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import { ContentItem } from '@/domain/content/contentItem';
import { Language } from '@/api/model/content/item/lang';

import Command from '@/api/useCases/articles/getAll/command';
import getAllArticles from '@/api/useCases/articles/getAll/handler';

import styles from '@/ui/styles/pages/posts.module.scss';

type Props = {
  articles: ContentItem[]
};

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await getAllArticles(new Command(Language.en, 1));

  return {
    props: {
      articles
    }
  };
};

const Articles: NextPage<Props> = ({ articles }) => {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.button}>
          <ContentMoreButton text="Go back" link="/" />
        </div>
        <ContentListComponent
          items={articles}
          vertical={false}
          withPagination={true}
          title="Articles"
          baseUrl="/articles"
        />
      </div>
    </div>
  );
};

export default Articles;
