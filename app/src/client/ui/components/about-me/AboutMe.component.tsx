import React from 'react';

import Link from 'next/link';

import {Language, LanguageType} from '@/domain/content/contentItem';

import { getText } from '@/app/utils/i18n/helper';

import styles from './about-me.module.scss';

type Props = {
  lang: LanguageType
};

const AboutMe: React.FC<Props> = ({ lang }) => {
  return (
    <div className={`container ${styles['about-container']}`}>
      <div className={styles.left}>
        <img className={styles.avatar} src="/img/me.jpg" alt=""/>
        <h1 className={styles.name}>{getText(lang, 'about-me-name')}</h1>
        <div className={styles['short-description']}>Frontend Developer</div>
      </div>
      <div className={styles.right}>
        {lang === Language.russian ? (
          <>
            <p className={styles.paragraph}>
              Привет! Меня зовут Расуль.
            </p>
            <p className={styles.paragraph}>
              Я фронтенд-разработчик. Превращаю макеты в работающие веб приложения.
              Работаю на результат, умею доводить проекты до конца.
            </p>
            <p className={styles.paragraph}>
              Иногда пишу статьи
              (<Link href="/content/blog"><a className={styles.link}>тык</a></Link>)
              и обзоры своих проектов
              (<Link href="/content/projects"><a className={styles.link}>тык</a></Link>).
            </p>
          </>
        ) : (
          <>
            <p className={styles.paragraph}>
              Hi! My name is Rasul.
            </p>
            <p className={styles.paragraph}>
              I am Frontend Developer. I turn layouts into working web applications.
              Always work for the result, bring projects to the end.
            </p>
            <p className={styles.paragraph}>
              Sometimes I write articles
              (<Link href="/content/blog"><a className={styles.link}>click</a></Link>)
              and my projects reviews
              (<Link href="/content/projects"><a className={styles.link}>click</a></Link>).
            </p>
            <p className={styles.paragraph}>
              If you have any questions, feel free to contact me.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutMe;
