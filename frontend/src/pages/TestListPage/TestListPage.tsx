'use client';

import { Button, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import TestList from "components/TestList";
import { useAppContext } from "contexts/AppContext";
import { STORAGE_KEYS } from "constants/storage";

export default function TestListPage() {
  const { isEntitled, setIsEntitled } = useAppContext();

  function handleSignOut() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setIsEntitled(false);
  }

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Тесты</Typography.Title>
        <TestList/>
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        {isEntitled ? (
          <Button onClick={handleSignOut}>
            Выйти
          </Button>
        ) : (
          <Button>
            <Link to={ROUTES.ADMIN_AUTH}>
              <span>Вход преподавателя</span>
            </Link>
          </Button>
        )}
      </Layout.Sider>
    </Layout>
  );
}
