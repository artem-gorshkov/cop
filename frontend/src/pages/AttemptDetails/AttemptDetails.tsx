'use client';

import { Button, Layout, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from "constants/routes";

export default function AttemptDetails() {
  const examId = Number(useParams().examId);
  const attemptId = Number(useParams().attemptId);

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Выбранные ответы</Typography.Title>
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        <Button>
          <Link to={`${ROUTES.ATTEMPT_LIST.replace(':examId', examId.toString())}`}>
            <span>Вернуться к журналу</span>
          </Link>
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
