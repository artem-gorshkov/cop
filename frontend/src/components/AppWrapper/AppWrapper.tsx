import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from 'components/Loader';
import styles from './AppWrapper.scss';

export default function AppWrapper() {
  return (
    <Suspense fallback={<Loader isCentered />}>
      <Layout>
        <Layout.Header className={styles.header}>КОП</Layout.Header>
        <Layout.Content className={styles.content}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer className={styles.footer}>
          Все права принадлежат Кафедре РВПЛ Санкт-Петербургского военно-морского института
        </Layout.Footer>
      </Layout>
    </Suspense>
  );
}
