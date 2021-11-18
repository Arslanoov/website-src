import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import { PaginatedContentItems } from '@/domain/content/contentItem';

import getAllContentItemsHandler from '@/api/useCases/contentItem/getAll/handler';
import getAllContentItemsCommand from '@/api/useCases/contentItem/getAll/command';

import ContentMoreButtonComponent from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/manage/content/list.module.scss';

export const getServerSideProps: GetServerSideProps = async () => {
  const initialItems = await getAllContentItemsHandler(new getAllContentItemsCommand(
    1,
    null,
    null,
    true
  ));

  return {
    props: {
      initialItems
    }
  };
};

type Props = {
  initialItems: PaginatedContentItems
};

const ContentItemList: NextPage<Props> = ({ initialItems }) => {
  const onDelete = () => {
    if (confirm('Are you sure?')) {
      alert('Deleted!');
    }
  };

  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.buttons}>
          <ContentMoreButtonComponent text="Back" link="/" />
          <ContentMoreButtonComponent text="Create" link="/manage/content/new" />
        </div>

        <table className={styles.table}>
          <thead>
            <tr className={styles.head}>
              <th>ID</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Views</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {initialItems.items.map((item) => (
              <tr key={item.id}>
                <td className={styles.cell}>
                  {item.id}
                </td>
                <td className={styles.cell}>
                  {item.cover ? <img src={item.cover} width="200px" alt="" /> : 'No cover found'}
                </td>
                <td className={styles.cell}>
                  {item.title}
                </td>
                <td className={styles.cell}>
                  {item.type}
                </td>
                <td className={styles.cell}>
                  {item.status}
                </td>
                <td className={styles.cell}>
                  {item.views}
                </td>
                <td className={styles.cell}>
                  <div className={styles.buttons}>
                    <ContentMoreButtonComponent
                      link={`manage/content/edit/${item.slug}`}
                      text="Edit"
                    />
                    <ContentMoreButtonComponent
                      onClick={onDelete}
                      text="Delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentItemList;
