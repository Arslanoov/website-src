import React, { useState, useEffect } from 'react';

import { PaginatedContentItems } from '@/domain/content/contentItem';

import { getAllContentItems } from '@/app/services/request/contentItem';

import AdminLayout from '@/ui/layouts/admin/AdminLayout';
import Pagination from '@/ui/components/pagination/Pagination';
import ContentMoreButtonComponent from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/manage/content/list.module.scss';

export default function ContentItemList() {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentItems, setContentItems] = useState<PaginatedContentItems>({
    items: [],
    perPage: 1,
    totalCount: 0
  });

  useEffect(() => {
    async function fetchItems() {
      const items = await getAllContentItems(currentPage);
      setContentItems(items);
    }

    setLoading(true);
    fetchItems().finally(() => setLoading(false));
  }, [currentPage]);

  return (
    <div className="container">
      <div className={styles.content}>
        <div className={styles.buttons}>
          <ContentMoreButtonComponent text="Back" link="/" />
          <ContentMoreButtonComponent text="Create" link="/manage/content/new" />
        </div>

        <h1 className={styles.title}>Content items</h1>

        {/* TODO: Add spinner */}
        {loading && <div>
          Loading...
        </div>}

        {!loading && <>
          <table className={styles.table}>
            <thead>
              <tr className={styles.head}>
                <th>ID</th>
                <th>Cover</th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Lang</th>
                <th>Views</th>
                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {contentItems.items.map((item) => (
                <tr key={item.id}>
                  <td className={styles.cell}>
                    {item.id}
                  </td>
                  <td className={styles.cell}>
                    {item.cover ? <img src={item.cover} width="200px" alt=""/> : 'No cover found'}
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
                    {item.lang}
                  </td>
                  <td className={styles.cell}>
                    {item.views}
                  </td>
                  <td className={styles.cell}>
                    <ContentMoreButtonComponent
                      link={`/manage/content/view/${item.slug}`}
                      text="View"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            pagesCount={Number(contentItems.totalCount) / Number(contentItems.perPage)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
        }
      </div>
    </div>
  );
};

ContentItemList.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;