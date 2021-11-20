import React from 'react';
import type { GetServerSideProps, NextPage } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButtonComponent from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';
import { PaginatedContentItems } from '@/domain/content/contentItem';

import getLatestContentItemsHandler from '@/api/useCases/contentItem/getLatest/handler';
import getLatestContentItemsCommand from '@/api/useCases/contentItem/getLatest/command';

import TextBox from '@/ui/components/text-box/TextBox.component';
import Avatar from '@/ui/components/avatar/Avatar.component';
import PanelsListComponent from '@/ui/components/panels/list/PanelsList.component';

import { textBoxContent, textBoxTitle } from '@/app/utils/dummy/text';

import styles from '@/ui/styles/pages/home.module.scss';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await getLatestContentItemsHandler(new getLatestContentItemsCommand(
    Language.en,
    Type.Article,
    false
  ));
  const projects = await getLatestContentItemsHandler(new getLatestContentItemsCommand(
    Language.en,
    Type.Project,
    false
  ));

  return {
    props: {
      articles,
      projects
    }
  };
};

type Props = {
  articles: PaginatedContentItems
  projects: PaginatedContentItems
};

const Home: NextPage<Props> = ({ articles, projects }) => {
  return (
    <>
      <div className={`container ${styles['about-container']}`}>
        <div className={styles.box}>
          <TextBox title={textBoxTitle} content={textBoxContent} />
        </div>
        <div className={styles.avatar}>
          <Avatar />
          <PanelsListComponent />
        </div>
      </div>

      <div className={`container ${styles['manage-container']}`}>
        <div className={styles.button}>
          <ContentMoreButton text="Manage" link="/manage/content/list" />
        </div>
      </div>

      <div className={`container ${styles['content-container']}`}>
        <div className={styles.blog}>
          <ContentListComponent
            paginatedItems={articles}
            vertical={true}
            prependEl={
              <div className={styles.button}>
                <ContentMoreButtonComponent link="/content/blog" />
              </div>
            }
            title="Recent posts"
            baseUrl="/content"
          />
        </div>

        <div className={styles.works}>
          <ContentListComponent
            paginatedItems={projects}
            vertical={true}
            prependEl={
              <div className={styles.button}>
                <ContentMoreButtonComponent link="/content/projects" />
              </div>
            }
            title="Recent projects"
            baseUrl="/content"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
