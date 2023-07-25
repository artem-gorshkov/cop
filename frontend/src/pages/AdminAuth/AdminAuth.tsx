'use client';

import { Button, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

export default function AdminAuth() {
  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Вход для преподавателя</Typography.Title>
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        <Button>
          <Link to={ROUTES.TEST_LIST}>
            <span>Назад</span>
          </Link>
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
