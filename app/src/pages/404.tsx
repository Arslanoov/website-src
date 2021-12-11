import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/error.module.scss';

export default function NotFound() {
  return (
    <div className={styles.error}>
      <h1 className={styles.title}>404</h1>
      <ContentMoreButton text="Home" link="/" />
    </div>
  );
};

NotFound.getLayout = (page) => <MainLayout title="Not Found">{page}</MainLayout>;