'use client';

import { Button, Form, Input, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { requiredRule } from 'constants/rules';
import styles from './Auth.scss';

export default function Auth() {
  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Вход для преподавателя</Typography.Title>
        <Form initialValues={{ username: '', password: '' }} name="adminAuth">
          <div className={styles.formItemWrapper}>
            <Form.Item name="username" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Логин" />
            </Form.Item>
            <Form.Item name="password" rules={[requiredRule]}>
              <Input.Password bordered={false} placeholder="Пароль" />
            </Form.Item>
          </div>
          <Button htmlType="submit">Войти</Button>
        </Form>
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
