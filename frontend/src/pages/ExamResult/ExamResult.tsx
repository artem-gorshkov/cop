'use client';

import { Button, Layout, Row, Typography } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useQuery } from "@tanstack/react-query";
import Api from "services/api";
import Loader from "components/Loader";
import styles from './ExamResult.scss';


export default function ExamResult() {
  const [searchParams] = useSearchParams();
  const examId = Number(searchParams.get('examId'));
  const attemptId = Number(searchParams.get('attemptId'));

  const { data: examResult, isFetching } = useQuery({
    queryKey: ['examResult', {examId, attemptId}],
    queryFn: () => Api.getExamResult({examId, attemptId}),
  });



  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Тест завершен</Typography.Title>
        {isFetching ? (
          <Loader />
        ) : (
          <div>
            <Row className={styles.row}>
              <Typography.Text>Верных ответов:</Typography.Text>
              <Typography.Text className={styles.result}>12/12</Typography.Text>
            </Row>
            <Row className={styles.row}>
              <Typography.Text>Оценка за тест:</Typography.Text>
              <Typography.Text className={styles.result}>Отлично</Typography.Text>
            </Row>
          </div>
        )}
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        <Button>
          <Link to={ROUTES.EXAM_LIST}>
            <span>На главную</span>
          </Link>
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
