import React from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { getText } from '@/app/utils/i18n/helper';

import { PaginatedContentItems } from '@/domain/content/contentItem';

import ContentListItem from '@/ui/components/content-list/item/ContentListItem.component';
import Pagination from '@/ui/components/pagination/Pagination';

import styles from './content-list.module.scss';

type Props = {
  title: string
  baseUrl: string
  paginationUrl?: string
  paginatedItems: PaginatedContentItems
  vertical?: boolean
  withPagination?: boolean
  currentPage?: number
  prependEl?: React.ReactElement
};

const ContentList: React.FC<Props> = ({
  title,
  baseUrl,
  paginatedItems,
  vertical = false,
  withPagination = false,
  currentPage = 1,
  paginationUrl = '',
  prependEl
}) => {
  const { locale } = useRouter();

  return (
    <>
      <div className={styles.preview}>
        <Link href="/"><a className={styles.back}>Back to Home</a></Link>
        <h2 className={styles.title}>{getText(locale, title)}</h2>

        {prependEl}
      </div>
      <div className={`${styles.wrapper} container`}>
        <div className={styles.content}>
          {paginatedItems.items.length === 0 ? <div className={styles['not-found']}>
            <p>{getText(locale, 'nothing-here')}</p>
            <p>
              {getText(locale, 'smth-interesting')} <a
                className={styles.link}
                href="https://github.com/Arslanoov"
                target="blank"
              >
              GitHub
              </a>?
            </p>
          </div>: <>
            <div className={styles.list} style={{
              gridTemplateColumns: vertical ? '1fr' : ''
            }}>
              {paginatedItems.items.map((item) => <ContentListItem
                key={item.id}
                title={item.title}
                createdAt={item.createdAt}
                locale={locale}
                link={`${baseUrl}/${item.slug}`}
              />)}
            </div>

            {withPagination && <Pagination
              pagesCount={Number(paginatedItems.totalCount) / Number(paginatedItems.perPage)}
              currentPage={currentPage}
              url={paginationUrl}
            />}
          </>}
        </div>
      </div>
    </>
  );
};

export default ContentList;
