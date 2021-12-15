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
              Привет! Я фронтенд-разработчик.
            </p>
            <p className={styles.paragraph}>
              Превращаю макеты в работающие веб приложения.
              Работаю на результат, умею доводить проекты до конца.
            </p>
            <p className={styles.paragraph}>
              Личные качества: внимательность, трудолюбие, оперативность, ответственность.
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
              Hi! I am an experienced Frontend Developer.
              I work quickly and efficiently, so I provide bug-free apps with high-quality and easy-to-maintain code.
            </p>
            <p className={styles.paragraph}>
              Have an experience of creating reactive & performant web applications with modern technologies.
              Also I create beautiful layouts with CSS and its pre processors, such as SCSS (SASS), Less & Stylus.
            </p>
            <p className={styles.paragraph}>
              Personal qualities: attentiveness, diligence, efficiency, responsibility.
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
