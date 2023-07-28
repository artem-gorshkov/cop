'use client';

import { Button, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import TestList from "components/TestList";
import { testsMock } from "../../../__mocks-data__/tests.mock";

export default function TestListPage() {
  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Тесты</Typography.Title>
        <TestList data={testsMock}/>
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        <Button>
          <Link to={ROUTES.ADMIN_AUTH}>
            <span>Вход преподавателя</span>
          </Link>
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
