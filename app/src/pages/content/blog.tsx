import { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';

import { Language as ApiLanguage } from '@/api/model/content/item/lang';
import { Type as ApiType } from '@/api/model/content/item/type';

import { PaginatedContentItems, Language, Type } from '@/domain/content/contentItem';

import { getAllArticles } from '@/app/services/request/contentItem';

import getAllContentItemsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllContentItemsHandler from '@/api/useCases/contentItem/getAll/handler';

import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/content-items.module.scss';

export const getServerSideProps: GetServerSideProps = async () => {
  const initialArticles = await getAllContentItemsHandler(new getAllContentItemsCommand(
    1,
    Language.english as unknown as ApiLanguage,
    Type.article as unknown as ApiType,
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

export default function Page({ initialArticles }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articles, setArticles] = useState<PaginatedContentItems>(initialArticles);

  // TODO: Remove unused request
  useEffect(() => {
    async function fetchArticles() {
      const articles = await getAllArticles(currentPage, Language.english as unknown as ApiLanguage);
      setArticles(articles);
    }

    fetchArticles();
  }, [currentPage]);

  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <ContentMoreButton text="Go back" link="/" />
          </div>
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

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};