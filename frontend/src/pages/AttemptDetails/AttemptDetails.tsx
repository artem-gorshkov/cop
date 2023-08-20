'use client';

import { Button, Layout, Table, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import Api from "services/api";
import { CloseOutlined, FileSearchOutlined } from "@ant-design/icons";
import type { AttemptDetails } from "types/attempt";
import { ROUTES } from "constants/routes";
import styles from './AttemptDetails.scss';
import cx from "classnames";
import Loader from "components/Loader";
import { useCallback } from "react";
import { getGrade } from "utils/grade";
import type { ExamPayload } from "types/exam";
import ExamDetail from "components/ExamDetail";
import { EMPTY_EXAM_DETAIL } from "constants/exam";

export default function AttemptDetails() {
  const examId = Number(useParams().examId);
  const attemptId = Number(useParams().attemptId);

  const { data: examDetails, isFetching: isFetchingDetails } = useQuery<ExamPayload>({
    queryKey: ['getExamDetails', examId],
    queryFn: () => Api.getExamDetails(examId),
  });

  const { data: attempts, isFetching: isFetchingAttempts } = useQuery<AttemptDetails[]>({
    queryKey: ['getAttemptList', examId],
    queryFn: () => Api.getAttemptList(examId),
  });

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
