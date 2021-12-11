import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

import { Language } from '@/domain/content/contentItem';

import styles from './panels-list.module.scss';

/*const nightMode = {
  light: 'Light mode',
  night: 'Night mode',
};*/

const PanelsList = () => {
  const { locale } = useRouter();

  return (
    <div className={styles.list}>
      <Link
        locale={locale === Language.english ? Language.russian : Language.english}
        href="/"
      >
        <a>
          {getText(locale, 'change-lang')}
        </a>
      </Link>
    </div>
  );
};

export default PanelsList;
