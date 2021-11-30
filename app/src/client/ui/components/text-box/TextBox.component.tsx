import React from 'react';

import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

import styles from './text-box.module.scss';

const TextBox: React.FC = () => {
  const { locale } = useRouter();

  return (
    <div>
      <div className={styles.title}>{getText(locale, 'about-me-title')}</div>
      <div className={styles.text}>
        {getText(locale, 'about-me')}
      </div>
    </div>
  );
};

export default TextBox;
