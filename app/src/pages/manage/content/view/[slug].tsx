import React, { useState } from 'react';

import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import { ContentItem } from '@/domain/content/contentItem';
import { Status } from '@/api/model/content/item/status';

import getContentItemHandler from '@/api/useCases/contentItem/getOne/handler';
import getContentItemCommand from '@/api/useCases/contentItem/getOne/command';

import {
  activateContentItem as activateContentItemRequest,
  makeContentItemDraft as makeContentItemDraftRequest,
  removeContentItem
} from '@/app/services/request/contentItem';

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
  const [status, setStatus] = useState<Status>(item.status as Status);

  const makeDraft = (id: string) => {
    async function makeContentItemDraft() {
      try {
        await makeContentItemDraftRequest(id);
      } catch (e) {}
    }

    setLoading(true);
    makeContentItemDraft()
      .then(() => setStatus(Status.Draft))
      .finally(() => setLoading(false));
  };

  const activate = (id: string) => {
    async function activateContentItem() {
      try {
        await activateContentItemRequest(id);
      } catch (e) {}
    }

    setLoading(true);
    activateContentItem()
      .then(() => setStatus(Status.Active))
      .finally(() => setLoading(false));
  };

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
          <ContentMoreButtonComponent text="Back" link="/manage/content/list" />

          <ContentMoreButtonComponent
            disabled={loading}
            link={`/manage/content/edit/${item.slug}`}
            text="Edit"
          />

          {status === Status.Active ? (
            <ContentMoreButtonComponent
              disabled={loading}
              onClick={() => makeDraft(item.id)}
              text="Make draft"
            />
          ) : (
            <ContentMoreButtonComponent
              disabled={loading}
              onClick={() => activate(item.id)}
              text="Activate"
            />
          )}

          <ContentMoreButtonComponent
            disabled={loading}
            onClick={() => onDelete(item.id)}
            text="Delete"
          />
        </div>

        <h1 className={styles.title}>Content items</h1>

        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th />
            </tr>
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
              <td className={styles.cell}>Language</td>
              <td className={styles.cell}>{item.lang}</td>
            </tr>
            <tr>
              <td className={styles.cell}>Status</td>
              <td className={styles.cell}>{status}</td>
            </tr>
            <tr>
              <td className={styles.cell}>Views</td>
              <td className={styles.cell}>{item.views}</td>
            </tr>
          </tbody>
        </table>

        <h3 className={styles.subtitle}>Content</h3>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{__html: item.content}}
        />
      </div>
    </div>
  );
};

export default ContentItemView;
