import React from 'react';

import Link from 'next/link';

import { LanguageType } from '@/domain/content/contentItem';

import styles from './about-me.module.scss';

type Props = {
  lang: LanguageType
};

const AboutMe: React.FC<Props> = ({ lang }) => {
  return (
    <div className={`container ${styles['about-container']}`}>
      <div className={styles.left}>
        <img className={styles.avatar} src="/img/me.jpg" alt=""/>
        <h1 className={styles.name}>Расуль Арсланов</h1>
        <div className={styles['short-description']}>Frontend Developer</div>
      </div>
      <div className={styles.right}>
        <p className={styles.paragraph}>
          Фронтенд разработчик.
        </p>
        <p className={styles.paragraph}>
          Превращаю макеты в работающие веб приложение.
          Работаю на результат, умею доводить проекты до конца.
        </p>
        <p className={styles.paragraph}>
          Иногда пишу статьи (<Link href="/content/blog"><a className={styles.link}>тык</a></Link>)
          и обзоры своих проектов (<Link href="/content/projects"><a className={styles.link}>тык</a></Link>)
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
