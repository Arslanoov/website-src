import Link from 'next/link';

import MainLayout from '@/ui/layouts/main/MainLayout';

import styles from '@/ui/styles/pages/error.module.scss';

export default function NotFound() {
  return (
    <div className={styles.error}>
      <h2 className={styles.title}>500</h2>
      <Link href="/"><a className={styles.back}>Back to Home</a></Link>
    </div>
  );
};

NotFound.getLayout = (page) => <MainLayout title="Server Error">{page}</MainLayout>;