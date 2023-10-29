import { useRouter } from 'next/router';

import MainLayout from '@/ui/layouts/main/MainLayout';

import styles from '@/ui/styles/pages/error.module.scss';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.error}>
      <h1 className={styles.title}>404</h1>
    </div>
  );
};

NotFound.getLayout = (page) => <MainLayout title="Not Found">{page}</MainLayout>;
