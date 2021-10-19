import React from 'react';

import styles from './TextBox.module.scss';

type Props = {
  content: string
}

const TextBox: React.FC<Props> = ({ content }) => (
  <div className={styles.textBox}>
    {content}
  </div>
);

export default TextBox;
