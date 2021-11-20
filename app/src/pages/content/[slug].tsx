import type { GetServerSideProps, NextPage } from 'next';

import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import { ContentItem as ContentItemInterface } from '@/domain/content/contentItem';

import getOneContentItemCommand from '@/api/useCases/contentItem/getOne/command';
import getOneContentItemHandler from '@/api/useCases/contentItem/getOne/handler';

import { dateFormatter } from '@/app/utils/date/formatter';

import styles from '@/ui/styles/pages/content-item.module.scss';

export const getServerSideProps: GetServerSideProps = async (req) => {
  const contentItem = await getOneContentItemHandler(new getOneContentItemCommand((req.query.slug ?? '') as string));

  return {
    props: {
      contentItem
    }
  };
};

type Props = {
  contentItem: ContentItemInterface
};

// TODO: Change reset file

const ContentItem: NextPage<Props> = ({ contentItem }) => {
  return (
    <>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.button}>
            <ContentMoreButton text="Go back" goBack />
          </div>
          <h1 className={styles.title}>
            {contentItem.title}
          </h1>
          <div className={styles.date}>
            {dateFormatter(contentItem.createdAt)}
          </div>
        </div>
      </div>

      {contentItem.cover && <img
        src={contentItem.cover}
        className={styles.image}
        draggable={false}
        alt=""
      />}

      <div className="container">
        <div className={styles.wrapper}>
          <p className={styles.description}>{contentItem.description}</p>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{__html: contentItem.content}}
          />
        </div>
      </div>
    </>
  );
};

export default ContentItem;
