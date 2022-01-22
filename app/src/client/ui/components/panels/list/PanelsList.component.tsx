import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Language } from '@/domain/content/contentItem';

import styles from './panels-list.module.scss';

const PanelsList = () => {
  const { locale, asPath } = useRouter();

  return (
    <div className={styles.list}>
      <Link
        locale={locale === Language.english ? Language.russian : Language.english}
        href={asPath}
      >
        <a>
          {locale} {'->'} {locale === Language.english ? Language.russian : Language.english}
        </a>
      </Link>
    </div>
  );
};

export default PanelsList;
