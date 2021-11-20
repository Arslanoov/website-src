import React, { useState } from 'react';

import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import { ContentItem } from '@/domain/content/contentItem';
import { Status } from '@/api/model/content/item/status';

import getContentItemHandler from '@/api/useCases/contentItem/getOne/handler';
import getContentItemCommand from '@/api/useCases/contentItem/getOne/command';

import { removeContentItem } from '@/app/services/request/contentItem';

import ContentMoreButtonComponent from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/manage/content/list.module.scss';

export const getServerSideProps: GetServerSideProps = async (req) => {
  const slug = (req.query.slug ?? '') as string;

  const item = await getContentItemHandler(new getContentItemCommand(
    slug,
    true
  ));

  return {
    props: {
      item
    }
  };
};

type Props = {
  item: ContentItem
};

const ContentItemView: NextPage<Props> = ({ item }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const makeDraft = (id: string) => {};
  const activate = (id: string) => {};

  const onDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      setLoading(true);
      await removeContentItem(id);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.buttons}>
          <ContentMoreButtonComponent text="Back" link="/" />

          <ContentMoreButtonComponent
            link={`/manage/content/edit/${item.slug}`}
            text="Edit"
          />

          {item.status === Status.Draft ? (
            <ContentMoreButtonComponent
              onClick={() => makeDraft(item.id)}
              text="Make draft"
            />
          ) : (
            <ContentMoreButtonComponent
              onClick={() => activate(item.id)}
              text="Activate"
            />
          )}

          <ContentMoreButtonComponent
            onClick={() => onDelete(item.id)}
            text="Delete"
          />
        </div>

        <h1 className={styles.title}>Content items</h1>

        <table className={styles.table}>
          <thead>
            <th />
            <th />
          </thead>
          <tbody>
            <tr>
              <td className={styles.cell}>ID</td>
              <td className={styles.cell}>{item.id}</td>
            </tr>
            <tr>
              <td className={styles.cell}>Cover</td>
              <td className={styles.cell}>
                {item.cover ? <img src={item.cover} width="200px" alt="" /> : 'No cover found'}
              </td>
            </tr>
            <tr>
              <td className={styles.cell}>Title</td>
              <td className={styles.cell}>{item.title}</td>
            </tr>
            <tr>
              <td className={styles.cell}>Type</td>
              <td className={styles.cell}>{item.type}</td>
            </tr>
            <tr>
              <td className={styles.cell}>Status</td>
              <td className={styles.cell}>{item.status}</td>
            </tr>
            <tr>
              <td className={styles.cell}>Views</td>
              <td className={styles.cell}>{item.views}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentItemView;
