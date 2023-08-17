'use client';

import { Button, Layout, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useQuery } from "@tanstack/react-query";
import Api from "services/api";
import Loader from "components/Loader";
import styles from './ExamResult.scss';
import cx from "classnames";
import { useMemo } from "react";
import { getGrade } from "utils/grade";
import type { AttemptDetails } from "types/attempt";

export default function ExamResult() {
  const attemptId = Number(useParams().attemptId);

  const { data: attemptDetails, isFetching } = useQuery<AttemptDetails>({
    queryKey: ['attemptDetails', attemptId],
    queryFn: () => Api.getAttemptDetails(attemptId),
  });

  const grade = useMemo(
    () => attemptDetails && getGrade(attemptDetails.rightCount / attemptDetails.totalCount),
    [attemptDetails]
  );

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Тест завершен</Typography.Title>
        {isFetching || !attemptDetails ? (
          <Loader />
        ) : (
          <div>
            <div className={styles.section}>
              <Typography.Text>Верных ответов:</Typography.Text>
              <Typography.Text
                className={styles.result}>{attemptDetails?.rightCount}/{attemptDetails?.totalCount}</Typography.Text>
            </div>
            <div className={styles.section}>
              <Typography.Text>Оценка за тест:</Typography.Text>
              <Typography.Text className={cx(styles.result, styles.grade, grade && styles[grade.key.toLowerCase()])}>
                {grade?.text}
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
