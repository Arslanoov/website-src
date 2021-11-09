import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import { PaginatedContentItems } from '@/domain/content/contentItem';
import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

import getAllProjectsCommand from '@/api/useCases/contentItem/getAll/command';
import getAllProjectsHandler from '@/api/useCases/contentItem/getAll/handler';

import { getAllProjects } from '@/app/services/request/contentTypeRequest';

import styles from '@/ui/styles/pages/posts.module.scss';

export const getServerSideProps: GetServerSideProps = async () => {
  const initialProjects = await getAllProjectsHandler(new getAllProjectsCommand(
    Language.en,
    Type.Project,
    1,
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

const Projects: NextPage<Props> = ({ initialProjects }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [projects, setProjects] = useState<PaginatedContentItems>(initialProjects);

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
        <div className={styles.button}>
          <ContentMoreButton text="Go back" link="/" />
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

export default Projects;
