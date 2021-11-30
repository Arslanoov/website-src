import React from 'react';

import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

import styles from './content-more-button.module.scss';

type Props = {
  link?: string
  text?: string
  disabled?: boolean,
  goBack?: boolean
  onClick?: () => void
};

const ContentMoreButton: React.FC<Props> = ({
  text = 'See all',
  link = null,
  disabled = false,
  goBack = false,
  onClick = () => {}
}) => {
  const router = useRouter();

  const onButtonClick = () => {
    if (onClick) {
      onClick();
    }

    if (goBack) {
      router.back();
    }

    if (link) {
      router.push(`/${router.locale}${link}`);
    }
  };

  return (
    <button onClick={onButtonClick} className={styles.button} disabled={disabled}>
      {getText(router.locale, text)}
    </button>
  );
};

export default ContentMoreButton;
