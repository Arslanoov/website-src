import React from 'react';

import PanelsItem from '../item/PanelsItem';

import styles from './panels-list.module.scss';

const languageOptions = {
  en: 'English',
  ru: 'Русский',
};

const nightMode = {
  light: 'Light mode',
  night: 'Night mode',
};

const PanelsList = () => {
  return (
    <div className={styles.list}>
      <PanelsItem label="Language" selected="en" options={languageOptions} />
      <PanelsItem label="Night mode" selected="light" options={nightMode} />
    </div>
  );
};

export default PanelsList;
