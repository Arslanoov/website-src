import type { GetServerSideProps } from 'next';
import Router from 'next/router';

import { Language as ApiLanguage } from '@/api/model/content/item/lang';
import { Type as ApiType } from '@/api/model/content/item/type';

import { PaginatedContentItems, Language, Type } from '@/domain/content/contentItem';

import getAllProjectsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllProjectsHandler from '@/api/useCases/contentItem/getAll/handler';

import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/content-items.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1}}) => {
  const projects = await getAllProjectsHandler(new getAllProjectsCommand(
    Number(page),
    Language.english as unknown as ApiLanguage,
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
  const changePage = (page: number) => Router.push(`/content/projects?page=${page}`);

  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <ContentMoreButton text="Go back" link="/" />
          </div>
        </div>
        <ContentListComponent
          paginatedItems={projects}
          currentPage={page}
          setCurrentPage={changePage}
          vertical={false}
          title="Projects"
          baseUrl="/content"
          withPagination
        />
      </div>
    </div>
  );
};

Projects.getLayout = (page) => <MainLayout>{page}</MainLayout>;