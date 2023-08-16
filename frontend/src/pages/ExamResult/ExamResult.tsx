'use client';

import { Button, Layout, Row, Typography } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useQuery } from "@tanstack/react-query";
import Api from "services/api";
import Loader from "components/Loader";
import styles from './ExamResult.scss';
import cx from "classnames";
import { useMemo } from "react";
import { getGrade } from "utils/grade";


export default function ExamResult() {
  const [searchParams] = useSearchParams();
  const examId = Number(searchParams.get('examId'));
  const attemptId = Number(searchParams.get('attemptId'));

  const { data: attemptDetails, isFetching } = useQuery({
    queryKey: ['attemptDetails', {examId, attemptId}],
    queryFn: () => Api.getAttemptDetails({examId, attemptId}),
  });

  const grade = useMemo(() => getGrade(attemptDetails?.fraction), [attemptDetails]);

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Тест завершен</Typography.Title>
        {isFetching ? (
          <Loader />
        ) : (
          <div>
            <div className={styles.section}>
              <Typography.Text>Верных ответов:</Typography.Text>
              <Typography.Text className={styles.result}>12/12</Typography.Text>
            </div>
            <div className={styles.section}>
              <Typography.Text>Оценка за тест:</Typography.Text>
              <Typography.Text className={cx(styles.result, styles.grade, styles[grade.key.toLowerCase()])}>
                {grade.text}
              </Typography.Text>
            </div>
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
