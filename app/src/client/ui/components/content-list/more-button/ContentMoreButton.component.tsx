import React from 'react';

import Link from 'next/link';

import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

import styles from './content-more-button.module.scss';

type Props = {
  link?: string
  text?: string
  disabled?: boolean,
  onClick?: () => void
};

const ContentMoreButton: React.FC<Props> = ({
  text = 'See all',
  link = null,
  disabled = false,
  onClick = () => {}
}) => {
  const router = useRouter();

  const onButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    link ? (
      <Link href={disabled ? '#' : `/${router.locale}${link}`}>
        <a className={styles.button}>{getText(router.locale, text)}</a>
      </Link>
    ) : (
      <button onClick={onButtonClick} className={styles.button} disabled={disabled}>
        {getText(router.locale, text)}
      </button>
    )
  );
};

export default ContentMoreButton;
