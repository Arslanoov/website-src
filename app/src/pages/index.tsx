import React from 'react';
import Router from 'next/router';

import { useSession } from 'next-auth/react';

import { AuthStatus, SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';

import MainLayout from '@/ui/layouts/main/MainLayout';
import AboutMe from '@/ui/sections/about-me/AboutMe';

import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/home.module.scss';

export default function Home() {
  const { status, data: session } = useSession();
  const user = session?.user as SessionUserInterface | null;

  const toManagePage = () => Router.push('/manage/content/list');

  return (
    <>
      <AboutMe />
      {
        status === AuthStatus.logged &&
        user.role === UserRole.Admin &&
        <button onClick={toManagePage} className={styles.button}>
          Manage
        </button>
      }
    </>
  );
};

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;