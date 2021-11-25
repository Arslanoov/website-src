import { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';

import { PaginatedContentItems } from '@/domain/content/contentItem';
import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

import { getAllProjects } from '@/app/services/request/contentItem';

import getAllProjectsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllProjectsHandler from '@/api/useCases/contentItem/getAll/handler';

import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/content-items.module.scss';

export const getServerSideProps: GetServerSideProps = async () => {
  const initialProjects = await getAllProjectsHandler(new getAllProjectsCommand(
    1,
    Language.en,
    Type.Project,
    false
  ));

  return {
    props: {
      initialProjects
    }
  };
};

type Props = {
  initialProjects: PaginatedContentItems
};

export default function Projects({ initialProjects }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [projects, setProjects] = useState<PaginatedContentItems>(initialProjects);

  // TODO: Remove unused query
  useEffect(() => {
    async function fetchProjects() {
      const projects = await getAllProjects(currentPage, Language.en);
      setProjects(projects);
    }

    fetchProjects();
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
          paginatedItems={projects}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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