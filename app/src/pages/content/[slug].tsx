import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ContentItem as ContentItemInterface } from '@/domain/content/contentItem';

import { dateFormatter } from '@/app/utils/date/formatter';

import getOneContentItemCommand from '@/api/useCases/contentItem/getOne/command';
import getOneContentItemHandler from '@/api/useCases/contentItem/getOne/handler';

import MainLayout from '@/ui/layouts/main/MainLayout';

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

export default function ContentItem({ contentItem }: Props) {
  const router = useRouter();

  return (
    <>
      <div className={styles.preview}>
        <a onClick={() => router.back()} className={styles.back}>Back to Home</a>
        <div className={styles.row}>
          <h1 className={styles.title}>{contentItem.title}</h1>
          <div className={styles.date}>
            {dateFormatter(contentItem.createdAt, router.locale)}
          </div>
          <p className={styles.description}>{contentItem.description}</p>
        </div>
      </div>
      <div className={`${styles.wrapper} container`}>
        {contentItem.cover && <img
          src={contentItem.cover}
          className={styles.image}
          draggable={false}
          alt=""
        />}

        <div className={styles.text} dangerouslySetInnerHTML={{
          __html: JSON.parse(contentItem.rawContent)
        }} />
      </div>
    </>
  );
};

ContentItem.getLayout = (page) => <MainLayout title="Content">{page}</MainLayout>;