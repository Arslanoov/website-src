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

  return (
    <div className="container">
      <div className={styles.container}>
        <h1 className={styles.title}>
          <Link href="/content/projects"><a></a></Link>
          <Link href="/content/blog"><a></a></Link>
          <Link href="/contact"><a></a></Link>
          {
            status === AuthStatus.logged &&
            user.role === UserRole.Admin &&
            <Link href="/manage/content/list"><a></a></Link>
          }
        </h1>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;