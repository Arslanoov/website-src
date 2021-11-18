import React from 'react';

import { useRouter } from 'next/router';

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
      router.push(link);
    }
  };

  return (
    <button onClick={onButtonClick} className={styles.button} disabled={disabled}>
      {text}
    </button>
  );
};

export default ContentMoreButton;
