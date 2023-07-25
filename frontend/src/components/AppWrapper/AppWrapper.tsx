import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from 'components/Loader';
import styles from './AppWrapper.scss';

export default function AppWrapper() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Layout>
        <Layout.Header className={styles.header}>КОП</Layout.Header>
        <Layout.Content className={styles.content}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer className={styles.footer}>Доп. информация</Layout.Footer>
      </Layout>
    </Suspense>
  );
}
