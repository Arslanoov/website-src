import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { AuthStatus, SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';

import MainLayout from '@/ui/layouts/main/MainLayout';

import styles from '@/ui/styles/pages/home.module.scss';

export default function Home() {
  const { status, data: session } = useSession();
  const user = session?.user as SessionUserInterface | null;

  const toManagePage = () => Router.push('/manage/content/list');

  return (
    <>
      {
        status === AuthStatus.logged &&
        user.role === UserRole.Admin &&
        <button onClick={toManagePage} className={styles.button}>
          Manage
        </button>
      }

      <div className={styles.container}>
        <h1 className={styles.title}>
          <Link href="/content/projects"><a></a></Link>
          <Link href="/content/blog"><a></a></Link>
          <Link href="/contact"><a></a></Link>
        </h1>
      </div>
    </>
  );
};

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;