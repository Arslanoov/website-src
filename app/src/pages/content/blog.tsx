import type { GetServerSideProps } from 'next';
import Router from 'next/router';

import { Language as ApiLanguage } from '@/api/model/content/item/lang';
import { Type as ApiType } from '@/api/model/content/item/type';

import { PaginatedContentItems, Language, Type } from '@/domain/content/contentItem';

import getAllContentItemsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllContentItemsHandler from '@/api/useCases/contentItem/getAll/handler';

import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/content-items.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1 }}) => {
  const articles = await getAllContentItemsHandler(new getAllContentItemsCommand(
    Number(page),
    Language.english as unknown as ApiLanguage,
    Type.article as unknown as ApiType,
    false
  ));

  return {
    props: {
      articles,
      page: Number(page)
    }
  };
};

type Props = {
  articles: PaginatedContentItems,
  page: number
};

export default function Blog({ articles, page }: Props) {
  const changePage = (page: number) => Router.push(`/content/blog?page=${page}`);

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
          currentPage={page}
          setCurrentPage={changePage}
          vertical={false}
          title="Articles"
          baseUrl="/content"
          withPagination
        />
      </div>
    </div>
  );
};

Blog.getLayout = (page) => <MainLayout>{page}</MainLayout>;