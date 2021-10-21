import React from 'react';

import ContentListItem from '../item/ContentListItem';

import styles from './content-list.module.scss';

type Props = {
  title: string
};

const ContentList: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <ContentListItem
            title={'Some article'}
            img={'https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
            description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, suscipit...'}
            link={'/'}
          />
        </div>
        <div className={styles.item}>
          <ContentListItem
            title={'Some article'}
            img={'https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
            description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, suscipit...'}
            link={'/'}
          />
        </div>
        <div className={styles.item}>
          <ContentListItem
            title={'Some article'}
            img={'https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'}
            description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, suscipit...'}
            link={'/'}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentList;
