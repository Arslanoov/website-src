import React from 'react';

import PanelsList from '@/ui/components/panels/list/PanelsList.component';

import styles from './footer.module.scss';

const Footer = () => {
  return (
    <>
      <header className="container">
        <div className={styles.footer}>
          <div>2021</div>
          <div className={styles.links}>
            <a className={styles.link} target="_blank" href="mailto:rasul@arslanoov.red" rel="noreferrer">rasul@arslanoov.red</a>
            <a className={styles.link} target="_blank" href="https://github.com/Arslanoov" rel="noreferrer">GitHub</a>
            <a className={styles.link} target="_blank" href="https://www.linkedin.com/in/arslanoov/" rel="noreferrer">Linkedin</a>
            <a className={styles.link} target="_blank" href="https://career.habr.com/arslanoov" rel="noreferrer">Habr Career</a>
            <PanelsList />
            {/*<a className={styles.link} target="_blank" href="https://leetcode.com/some_kind_of_arslanoov/" rel="noreferrer">LeetCode</a>
            <a className={styles.link} target="_blank" href="https://www.reddit.com/user/rarslanoov" rel="noreferrer">Reddit</a>
            <a className={styles.link} target="_blank" href="https://vc.ru/u/979383-rasul-arslanov/details/all" rel="noreferrer">VC</a>*/}
          </div>
        </div>
      </header>
    </>
  );
};

export default Footer;
