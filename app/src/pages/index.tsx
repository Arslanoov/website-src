import React from 'react';
import type { GetServerSideProps } from 'next';

import { useSession } from 'next-auth/react';

import { Language as ApiLanguage } from '@/api/model/content/item/lang';
import { Type as ApiType } from '@/api/model/content/item/type';

import { PaginatedContentItems, Type } from '@/domain/content/contentItem';
import { AuthStatus, SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';

import getLatestContentItemsHandler from '@/api/useCases/contentItem/getLatest/handler';
import getLatestContentItemsCommand from '@/api/useCases/contentItem/getLatest/command';

import MainLayout from '@/ui/layouts/main/MainLayout';
import TextBox from '@/ui/components/text-box/TextBox.component';
import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButtonComponent from '@/ui/components/content-list/more-button/ContentMoreButton.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/home.module.scss';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const articles = await getLatestContentItemsHandler(new getLatestContentItemsCommand(
    locale as ApiLanguage,
    Type.article as unknown as ApiType,
    false
  ));
  const projects = await getLatestContentItemsHandler(new getLatestContentItemsCommand(
    locale as ApiLanguage,
    Type.project as unknown as ApiType,
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

export default function Home({ articles, projects }: Props) {
  const { status, data: session } = useSession();
  const user = session?.user as SessionUserInterface | null;

  return (
    <>
      <div className={`container ${styles['about-container']}`}>
        <div className={styles.box}>
          <TextBox />
        </div>
        {/* <div className={styles.avatar}>
          <Avatar />
        </div> */}
      </div>

      {
        status === AuthStatus.logged &&
        user.role === UserRole.Admin &&
        <div className={`container ${styles['manage-container']}`}>
          <div className={styles.button}>
            <ContentMoreButton text="Manage" link="/manage/content/list" />
          </div>
        </div>
      }

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

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;