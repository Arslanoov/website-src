import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react';

import { AuthStatus, SessionUserInterface } from '@/domain/user/auth';
import { UserRole } from '@/domain/user/user';
import { Language } from '@/domain/content/contentItem';

import MainLayout from '@/ui/layouts/main/MainLayout';

import styles from '@/ui/styles/pages/home.module.scss';

export default function Home() {
  const { status, data: session } = useSession();
  const { locale, asPath } = useRouter();
  const user = session?.user as SessionUserInterface | null;

  return (
    <div className="container">
      <div className={styles.container}>
        <div className={`${styles.content} ${locale === Language.english ? styles.title_en : styles.title_ru}`}>
          <h2 className={styles.subtitle}>Hey there</h2>
          <h1 className={styles.title}>I make websites</h1>
          <p className={styles.description}>I also write some notes about the web & building pet-projects in my free time.</p>
          <Link
            locale={locale === Language.english ? Language.russian : Language.english}
            href={asPath}
          >
            <a className={styles.langChange}>
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
              (
                <div className={styles.manage}>
                  <Link href="/manage/content/list">
                    <a>Manage</a>
                  </Link>
                </div>
              )
          }
        </div>

        <div className={`${styles.hint} ${styles.socials}`}>
          <div className={styles.socialsTop}>
            <a href="https://github.com/Arslanoov" target="_blank" rel="noreferrer">
              <Image src="/icons/github.svg" width={32} height={32} alt="github" />
            </a>

            <a href="https://www.linkedin.com/in/arslanoov/" target="_blank" rel="noreferrer">
              <Image src="/icons/linkedin.svg" width={32} height={32} alt="linkedin" />
            </a>
          </div>
          <div>
            <a href="mailto:rasularslanoov@gmail.com">
              rasularslanoov@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;
