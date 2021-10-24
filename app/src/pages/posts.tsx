import type { NextPage, GetServerSideProps } from 'next';

import ContentListComponent from '@/ui/components/content-list/list/ContentList.component';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import { ContentItem } from '@/domain/content/contentItem';

import { getAllPosts } from '@/api/useCases/posts/getAllPosts';

import styles from '@/ui/styles/pages/posts.module.scss';

type Props = {
  posts: ContentItem[]
};

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts
    }
  };
};

const Posts: NextPage<Props> = ({ posts }) => {
  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.button}>
          <ContentMoreButton text="Go back" link="/" />
        </div>
        <ContentListComponent
          items={posts}
          vertical={false}
          withPagination={true}
          title="Posts"
          baseUrl="/posts"
        />
      </div>
    </div>
  );
};

export default Posts;
