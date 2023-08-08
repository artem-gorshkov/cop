'use client';

import { Button, Form, Input, Layout, notification, Typography } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { requiredRule } from 'constants/rules';
import styles from './Auth.scss';
import { useMutation } from "@tanstack/react-query";
import Api from "services/api";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleAuthSuccess() {
    navigate(`${ROUTES.PASS}/${searchParams.get('examId')}`);
  }

  function handleAuthError(error: Error) {
    notification.error({ message: error.message });
  }

  const { mutate: signIn, isLoading: isSigningIn } = useMutation({
    mutationKey: ['auth'],
    mutationFn: Api.auth,
    onError: handleAuthError,
    onSuccess: handleAuthSuccess,
  });


  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Вход для обучаемого</Typography.Title>
        <Form initialValues={{ name: '', patronymic: '', surname: '', groupNumber: '' }} name="auth" onFinish={signIn}>
          <div className={styles.formItemWrapper}>
            <Form.Item name="surname" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Фамилия" />
            </Form.Item>
            <Form.Item name="name" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Имя" />
            </Form.Item>
            <Form.Item name="patronymic" rules={[requiredRule]}>
              <Input bordered={false} placeholder="Отчество" />
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
          <Link to={ROUTES.EXAM_LIST}>
            <span>Назад</span>
          </Link>
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
