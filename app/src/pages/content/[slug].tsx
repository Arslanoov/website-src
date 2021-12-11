import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { ContentItem as ContentItemInterface } from '@/domain/content/contentItem';

import { dateFormatter } from '@/app/utils/date/formatter';

import getOneContentItemCommand from '@/api/useCases/contentItem/getOne/command';
import getOneContentItemHandler from '@/api/useCases/contentItem/getOne/handler';

import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

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

const Editor = dynamic(import('@/ui/components/editor/Editor'), {
  ssr: false
});

export default function ContentItem({ contentItem }: Props) {
  const { locale } = useRouter();

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.wrapper}>
          {contentItem.cover && <img
            src={contentItem.cover}
            className={styles.image}
            draggable={false}
            alt=""
          />}

          <div className={styles.content}>
            <div className={styles.row}>
              <h1 className={styles.title}>
                {contentItem.title}
              </h1>
              <ContentMoreButton text="Back" goBack />
            </div>
            <div className={styles.date}>
              {dateFormatter(contentItem.createdAt, locale)}
            </div>
            <p className={styles.description}>{contentItem.description}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <Editor
              initialValue={JSON.parse(contentItem.rawContent)}
              onChange={() => {}}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ContentItem.getLayout = (page) => <MainLayout title="Content">{page}</MainLayout>;