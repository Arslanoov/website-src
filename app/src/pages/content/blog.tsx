import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import { PaginatedContentItems } from '@/domain/content/contentItem';
import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

import getAllContentItemsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllContentItemsHandler from '@/api/useCases/contentItem/getAll/handler';

import { getAllArticles } from '@/app/services/request/contentTypeRequest';

import styles from '@/ui/styles/pages/content-items.module.scss';

export const getServerSideProps: GetServerSideProps = async () => {
  const initialArticles = await getAllContentItemsHandler(new getAllContentItemsCommand(
    Language.en,
    Type.Article,
    1,
    false
  ));

  return {
    props: {
      initialArticles
    }
  };
};

type Props = {
  initialArticles: PaginatedContentItems
};

const Articles: NextPage<Props> = ({ initialArticles }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articles, setArticles] = useState<PaginatedContentItems>(initialArticles);

  useEffect(() => {
    async function fetchArticles() {
      const articles = await getAllArticles(currentPage, Language.en);
      setArticles(articles);
    }

    fetchArticles();
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
          vertical={false}
          title="Articles"
          baseUrl="/content"
          withPagination
        />
      </div>
    </div>
  );
};

export default Articles;
