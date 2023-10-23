import type { GetServerSideProps } from 'next';

import { Language as ApiLanguage } from '@/api/model/content/item/lang';
import { Type as ApiType } from '@/api/model/content/item/type';

import { PaginatedContentItems, Type } from '@/domain/content/contentItem';

import getAllContentItemsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllContentItemsHandler from '@/api/useCases/contentItem/getAll/handler';

import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';

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

export default function Notes({ articles, page }: Props) {
  return (
    <ContentListComponent
      paginatedItems={articles}
      currentPage={page}
      vertical={false}
      title="Notes"
      baseUrl="/"
      paginationUrl="notes"
      withPagination
    />
  );
};

Notes.getLayout = (page) => <MainLayout title="Blog">{page}</MainLayout>;
