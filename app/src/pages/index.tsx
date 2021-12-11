import React from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { AuthStatus, SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';
import { LanguageType } from '@/domain/content/contentItem';

import MainLayout from '@/ui/layouts/main/MainLayout';
import AboutMe from '@/ui/components/about-me/AboutMe.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/home.module.scss';

export default function Home() {
  const { status, data: session } = useSession();
  const user = session?.user as SessionUserInterface | null;

  const { locale } = useRouter();

  return (
    <>
      {
        status === AuthStatus.logged &&
        user.role === UserRole.Admin &&
        <div className="container">
          <div className={styles.button}>
            <ContentMoreButton text="Manage" link="/manage/content/list" />
          </div>
        </div>
      }

      <AboutMe lang={locale as LanguageType} />
    </>
  );
};

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;