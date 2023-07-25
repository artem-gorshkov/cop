'use client';

import { Button, Layout } from 'antd';

export default function TestList() {
  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>Тесты</Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        <Button>Вход преподавателя</Button>
      </Layout.Sider>
    </Layout>
  );
}
