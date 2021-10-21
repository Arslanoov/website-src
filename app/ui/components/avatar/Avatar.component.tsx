import React from 'react';

import Image from 'next/image';

import styles from './avatar.module.scss';

const Avatar = () => {
  return (
    <div className={styles.container}>
      <Image draggable={false} className={styles.avatar} layout="fill" src="/img/me.jpg" alt="me" />
    </div>
  );
};

export default Avatar;
