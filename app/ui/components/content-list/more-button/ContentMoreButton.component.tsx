import React from 'react';

import { useRouter } from 'next/router';

import styles from './content-more-button.module.scss';

type Props = {
  link?: string
  text?: string
  disabled?: boolean
};

const ContentMoreButton: React.FC<Props> = ({
  text = 'See all',
  link = null,
  disabled = false
}) => {
  const router = useRouter();
  const onClick = () => link ? router.push(link) : false;

  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {text}
    </button>
  );
};

export default ContentMoreButton;
