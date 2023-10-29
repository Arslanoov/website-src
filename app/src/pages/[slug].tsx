import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ContentItem as ContentItemInterface, Type } from '@/domain/content/contentItem';

import { dateFormatter } from '@/app/utils/date/formatter';

import getOneContentItemCommand from '@/api/useCases/contentItem/getOne/command';
import getOneContentItemHandler from '@/api/useCases/contentItem/getOne/handler';

import { getText } from '@/app/utils/i18n/helper';

import MainLayout from '@/ui/layouts/main/MainLayout';

import styles from '@/ui/styles/pages/content-item.module.scss';

export const getServerSideProps: GetServerSideProps = async ({  res, query }) => {
  try {
    const contentItem = await getOneContentItemHandler(new getOneContentItemCommand((query.slug ?? '') as string));
    return {
      props: {
        contentItem
      }
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      },
      props: {}
    };
  }
};

type Props = {
  contentItem: ContentItemInterface
};

export default function ContentItem({ contentItem }: Props) {
  const { locale } = useRouter();

  return (
    <>
      <div className={`${styles.wrapper} container`}>
        <div className={styles.row}>
          <h1 className={styles.title}>{contentItem.title}</h1>
          <div className={styles.date}>
            {dateFormatter(contentItem.createdAt, locale)}
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
          __html: contentItem.rawContent
        }} />
      </div>
    </>
  );
};

ContentItem.getLayout = (page) => <MainLayout title={page.props.contentItem.title}>{page}</MainLayout>;
