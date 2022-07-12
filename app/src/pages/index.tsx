import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { AuthStatus, SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';
import { Language } from '@/domain/content/contentItem';

import MainLayout from '@/ui/layouts/main/MainLayout';

import { getText } from '@/app/utils/i18n/helper';

import styles from '@/ui/styles/pages/home.module.scss';

export default function Home() {
  const { status, data: session } = useSession();
  const { locale, asPath } = useRouter();
  const user = session?.user as SessionUserInterface | null;

  return (
    <div className="container">
      <div className={styles.container}>
        <h1 className={`${styles.title} ${locale === Language.english ? styles.title_en : styles.title_ru}`}>
          <Link href="/projects"><a></a></Link>
          <Link href="/blog"><a></a></Link>
          <Link href="/contact"><a></a></Link>
          <Link
            locale={locale === Language.english ? Language.russian : Language.english}
            href={asPath}
          >
            <a>
              {locale.toUpperCase()} {'-> '}
              {
                (locale === Language.english ?
                  Language.russian :
                  Language.english).toUpperCase()
              }
            </a>
          </Link>
          {
            status === AuthStatus.logged &&
            user.role === UserRole.Admin &&
            <Link href="/manage/content/list"><a>Manage</a></Link>
          }
        </h1>

        <div className={`${styles.hint} ${styles.tap}`}>{getText(locale, 'tap-hint')}</div>
        <div className={`${styles.hint} ${styles.hover}`}>{getText(locale, 'hover-hint')}</div>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;