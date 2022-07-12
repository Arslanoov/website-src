import type { GetServerSideProps } from 'next';

import { Language as ApiLanguage } from '@/api/model/content/item/lang';
import { Type as ApiType } from '@/api/model/content/item/type';

import { PaginatedContentItems, Type } from '@/domain/content/contentItem';

import getAllProjectsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllProjectsHandler from '@/api/useCases/contentItem/getAll/handler';

import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';

export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1}, locale }) => {
  const projects = await getAllProjectsHandler(new getAllProjectsCommand(
    Number(page),
    locale as ApiLanguage,
    Type.project as unknown as ApiType,
    false
  ));

  return {
    props: {
      projects,
      page: Number(page)
    }
  };
};

type Props = {
  projects: PaginatedContentItems,
  page: number
};

export default function Projects({ projects, page }: Props) {
  return (
    <ContentListComponent
      paginatedItems={projects}
      currentPage={page}
      vertical={false}
      title="Projects"
      baseUrl="/"
      paginationUrl="projects"
      withPagination
    />
  );
};

Projects.getLayout = (page) => <MainLayout title="Projects">{page}</MainLayout>;