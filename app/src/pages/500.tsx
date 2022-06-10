import Link from 'next/link';
import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

import MainLayout from '@/ui/layouts/main/MainLayout';

import styles from '@/ui/styles/pages/error.module.scss';


export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.error}>
      <h2 className={styles.title}>500</h2>
      <Link href="/"><a className={styles.back}>{getText(router.locale, 'back-to-home')}</a></Link>
    </div>
  );
};

NotFound.getLayout = (page) => <MainLayout title="Server Error">{page}</MainLayout>;