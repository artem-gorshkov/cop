import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from 'components/Loader';
import styles from './AppWrapper.scss';
import { useAppContext } from "contexts/AppContext";

export default function AppWrapper() {
  const { headerText } = useAppContext();

  return (
    <Suspense fallback={<Loader isCentered />}>
      <Layout>
        <Layout.Header className={styles.header} title={headerText}>{headerText}</Layout.Header>
        <Layout.Content className={styles.content}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer className={styles.footer}>
          Все права принадлежат кафедре Ракетного вооружения подводных лодок, 2023г.
        </Layout.Footer>
      </Layout>
    </Suspense>
  );
}
