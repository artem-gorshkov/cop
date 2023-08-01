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
        <Typography.Title>Вход для обучаемого</Typography.Title>
        <Form initialValues={{ name: '', patronymic: '', surname: '', groupNumber: '' }} name="Auth">
          <div className={styles.formItemWrapper}>
            <Form.Item name="name" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Имя" />
            </Form.Item>
            <Form.Item name="patronymic" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Отчество" />
            </Form.Item>
            <Form.Item name="surname" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Фамилия" />
            </Form.Item>
            <Form.Item name="groupNumber" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Номер группы" />
            </Form.Item>
          </div>
          <Button htmlType="submit">Начать тест</Button>
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
