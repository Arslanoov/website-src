import Link from 'next/link';
import { useRouter } from 'next/router';

import { getText } from '@/app/utils/i18n/helper';

import MainLayout from '@/ui/layouts/main/MainLayout';

import styles from '@/ui/styles/pages/contact.module.scss';

export default function Contact() {
  const router = useRouter();

  return (
    <>
      <div className={styles.preview}>
        <Link href="/"><a className={styles.back}>{getText(router.locale, 'back-to-home')}</a></Link>
        <h2 className={styles.title}>{getText(router.locale, 'contact')}</h2>
      </div>

      <div className="container">
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a
                href="https://github.com/Arslanoov"
                target="_blank"
                rel="noreferrer"
              >
                Git<span className={styles.colored}>Hub</span>
              </a>
            </li>
            <li className={styles.item}>
              <a
                href="https://www.linkedin.com/in/arslanoov/"
                target="_blank"
                rel="noreferrer"
              >
                Linked<span className={styles.colored}>in</span>
              </a>
            </li>
            <li className={styles.item}>
              <a
                href="https://career.habr.com/arslanoov"
                target="_blank"
                rel="noreferrer"
              >
                Habr<span className={styles.colored}>Career</span>
              </a>
            </li>
            <li className={styles.item}>
              <a href="https://leetcode.com/some_kind_of_arslanoov/" target="_blank"
                rel="noreferrer">
                Leet<span className={styles.colored}>Code</span>
              </a>
            </li>
            <li className={styles.item}>
              <a href="https://bigfrontend.dev/user/Arslanoov" target="_blank"
                rel="noreferrer">
                BFE<span className={styles.colored}>.dev</span>
              </a>
            </li>
            <li className={styles.item}>
              <a href="mailto:rasularslanoov@gmail.com" target="_blank"
                rel="noreferrer">
                rasularslanoov<span className={styles.colored}>@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

Contact.getLayout = (page) => <MainLayout title="Contact Me">{page}</MainLayout>;