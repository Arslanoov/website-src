import Image from 'next/image';
import type { GetServerSideProps, NextPage } from 'next';

import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import { ContentItem } from '@/domain/content/contentItem';

import getOneArticleCommand from '@/api/useCases/articles/getOne/command';
import getOneArticleHandler from '@/api/useCases/articles/getOne/handler';

import { dateFormatter } from '@/utils/date/formatter';

import styles from '@/ui/styles/pages/post.module.scss';

export const getServerSideProps: GetServerSideProps = async (req) => {
  const article =
    await getOneArticleHandler(new getOneArticleCommand((req.query.slug ?? '') as string));

  return {
    props: {
      article
    }
  };
};

type Props = {
  article: ContentItem
};

const ArticleItem: NextPage<Props> = ({ article }) => {
  return (
    <>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.button}>
            <ContentMoreButton text="Go back" link="/" />
          </div>
          <h1 className={styles.title}>
            {article.title}
          </h1>
          <div className={styles.date}>
            {dateFormatter(article.createdAt)}
          </div>
        </div>
      </div>

      {article.cover && <div className={styles.cover}>
        <Image
          src={article.cover}
          className={styles.image}
          draggable={false}
          layout="fill"
          alt=""
        />
      </div>}

      <div className="container">
        <div className={styles.wrapper}>
          <p className={styles.description}>{article.description}</p>
          <div className={styles.content}>{article.content}</div>
        </div>
      </div>
    </>
  );
};

export default ArticleItem;
