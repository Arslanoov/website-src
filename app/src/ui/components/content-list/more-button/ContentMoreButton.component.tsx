import React from 'react';

import { useRouter } from 'next/router';

import styles from './content-more-button.module.scss';

type Props = {
  link?: string
  text?: string
  disabled?: boolean,
  goBack?: boolean
};

const ContentMoreButton: React.FC<Props> = ({
  text = 'See all',
  link = null,
  disabled = false,
  goBack = false
}) => {
  const router = useRouter();
  const onClick = () => {
    if (goBack) {
      router.back();
    }

    if (link) {
      router.push(link);
    }
  };

  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {text}
    </button>
  );
};

export default ContentMoreButton;
