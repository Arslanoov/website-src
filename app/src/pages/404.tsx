import MainLayout from '@/ui/layouts/main/MainLayout';
import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/error.module.scss';

export default function NotFound() {
  return (
    <div className={styles.error}>
      <h2 className={styles.title}>Not Found</h2>
      <ContentMoreButton text="Home" link="/" />
    </div>
  );
};

NotFound.getLayout = (page) => <MainLayout title="Not Found">{page}</MainLayout>;