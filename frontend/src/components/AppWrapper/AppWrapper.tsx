import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Loader from 'components/Loader';
import styles from './AppWrapper.scss';
import { useAppContext } from "contexts/AppContext";
import { ROUTES } from "constants/routes";
import cx from "classnames";

export default function AppWrapper() {
  const { headerText, isEntitled } = useAppContext();

  const {pathname} = useLocation();
  const isOnAdminPage = isEntitled || pathname === ROUTES.ADMIN_AUTH;

  return (
    <Suspense fallback={<Loader isCentered />}>
      <Layout>
        <Layout.Header className={cx(styles.header, isOnAdminPage && styles.adminHeader)} title={headerText}>
          {headerText}
        </Layout.Header>
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
