import { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import { PaginatedContentItems } from '@/domain/content/contentItem';
import { Language } from '@/api/model/content/item/lang';

import getAllArticlesCommand from '@/api/useCases/articles/getAll/command';
import getAllArticlesHandler from '@/api/useCases/articles/getAll/handler';

import styles from '@/ui/styles/pages/posts.module.scss';

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await getAllArticlesHandler(new getAllArticlesCommand(Language.en, 1));

  return {
    props: {
      articles
    }
  };
};

type Props = {
  articles: PaginatedContentItems
};

const Articles: NextPage<Props> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {

  }, [currentPage]);

  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.button}>
          <ContentMoreButton text="Go back" link="/" />
        </div>
        <ContentListComponent
          paginatedItems={articles}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          title="Articles"
          baseUrl="/articles"
          vertical={false}
          withPagination
        />
      </div>
    </div>
  );
};

export default Articles;
