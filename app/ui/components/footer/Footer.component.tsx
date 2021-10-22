import React from 'react';

import styles from './footer.module.scss';

const Footer = () => {
  return (
    <>
      <footer className="container">
        <div className={styles.footer}>
          <div>
            2021
          </div>
          <div className={styles.links}>
            <a className={styles.link} target="_blank" href="mailto:rasul@arslanoov.red" rel="noreferrer">rasul@arslanoov.red</a>
            <a className={styles.link} target="_blank" href="https://github.com/Arslanoov" rel="noreferrer">GitHub</a>
            <a className={styles.link} target="_blank" href="https://www.linkedin.com/in/arslanoov/" rel="noreferrer">Linkedin</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
