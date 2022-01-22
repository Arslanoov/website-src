import type { GetServerSideProps } from 'next';

import { Language as ApiLanguage } from '@/api/model/content/item/lang';
import { Type as ApiType } from '@/api/model/content/item/type';

import { PaginatedContentItems, Type } from '@/domain/content/contentItem';

import getAllContentItemsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllContentItemsHandler from '@/api/useCases/contentItem/getAll/handler';

import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/content-items.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1 }, locale}) => {
  const articles = await getAllContentItemsHandler(new getAllContentItemsCommand(
    Number(page),
    locale as ApiLanguage,
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
          vertical={false}
          title="Articles"
          baseUrl="/content"
          paginationUrl="/content/blog"
          withPagination
        />
      </div>
    </div>
  );
};

Blog.getLayout = (page) => <MainLayout title="Blog">{page}</MainLayout>;