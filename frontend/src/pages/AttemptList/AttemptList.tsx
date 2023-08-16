'use client';

import { Button, Layout, notification, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "services/api";
import { useMemo } from "react";
import ExamDetail from "components/ExamDetail";
import type { Exam, ExamPayload } from "types/exam";
import { normalizeExamData, normalizeExamPayload } from "utils/normalize";
import Loader from "components/Loader";
import { ROUTES } from "constants/routes";
import { FileSearchOutlined } from "@ant-design/icons";

export default function AttemptList() {
  const navigate = useNavigate();

  const examId = Number(useParams().examId);

  const { data: examDetails, isFetching: isFetchingDetails } = useQuery<ExamPayload>({
    queryKey: ['getExamDetails', examId],
    queryFn: () => Api.getExamDetails(examId),
  });

  const normalizedDetails = useMemo<Exam | undefined>(
    () => examDetails && normalizeExamPayload({ data: examDetails }),
    [examDetails]
  );

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Прохождение теста</Typography.Title>
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        {/* @ts-ignore */}
        <Button htmlType="submit" form='exam' loading={isPassingExam} disabled={isPassingExam}>
          Завершить тест
        </Button>
        <FileSearchOutlined />
      </Layout.Sider>
    </Layout>
  );
}
