import React from 'react';

import styles from './text-box.module.scss';

type Props = {
  title: string
  content: string
};

const TextBox: React.FC<Props> = ({ title, content }) => (
  <div>
    <div className={styles.title}>{title}</div>
    <div className={styles.text}>
      {content}
    </div>
  </div>
);

export default TextBox;
