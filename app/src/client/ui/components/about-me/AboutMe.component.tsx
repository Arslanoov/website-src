import React, { useState } from 'react';

import Link from 'next/link';

import Typist from 'react-typist';

import { Language, LanguageType } from '@/domain/content/contentItem';

import { getText } from '@/app/utils/i18n/helper';

import styles from './about-me.module.scss';

type Props = {
  lang: LanguageType,
};

const AboutMe: React.FC<Props> = ({ lang }) => {
  const [isTyped, setIsTyped] = useState<boolean>(false);

  return (
    <div className={`container ${styles['about-container']}`}>
      <div className={styles.content}>
        <Typist onTypingDone={() => setIsTyped(true)} cursor={{ element: '' }}>
          <div className={styles.top}>
            <h1 className={styles.name}>{getText(lang, 'about-me-name')}</h1>
            <div className={styles['short-description']}>Frontend Developer</div>
          </div>
        </Typist>
        <div className={`${styles.center} ${isTyped && styles.typed}`}>
          {lang === Language.russian ? (
            <>
              <p className={styles.paragraph}>
                  Превращаю макеты в работающие веб приложения.
                  Работаю на результат, умею доводить проекты до конца.
              </p>
              <p className={styles.links}>
                <Link href="/content/blog"><a className={styles.link}>Блог</a></Link>
                <Link href="/content/projects"><a className={styles.link}>Проекты</a></Link>
              </p>
            </>
          ) : (
            <>
              <p className={styles.paragraph}>
                  I turn layouts into working web applications.
                  Always work for the result, bring projects to the end.
              </p>
              <p className={styles.links}>
                <Link href="/content/blog"><a className={styles.link}>Blog</a></Link>
                <Link href="/content/projects"><a className={styles.link}>Projects</a></Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
