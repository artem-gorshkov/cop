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

export default function ExamPass() {
  const navigate = useNavigate();

  const examId = Number(useParams().examId);

  const { data: examDetails, isFetching: isFetchingDetails } = useQuery<ExamPayload>({
    queryKey: ['getExamDetails', examId],
    queryFn: () => Api.getExamDetails(examId),
  });

  const normalizedDetails = useMemo<Exam | undefined>(
    () => examDetails && normalizeExamPayload({data: examDetails}),
    [examDetails]
  );

  function handlePassSuccess() {
    notification.success({ message: 'Изменения сохранены' });
  }

  function handlePassError(error: Error) {
    notification.error({ message: error.message });
  }

  const { mutate: passExam, isLoading: isPassingExam } = useMutation({
    mutationKey: ['passExam', examId],
    mutationFn: Api.passExam,
    onError: handlePassError,
    onSuccess: handlePassSuccess,
  });

  function handleFinishExam (data: Exam) {
    passExam({id: examId, data: normalizeExamData(data)});
  }

  return (
    <Layout hasSider className="fullHeight">
      <Layout.Content>
        <Typography.Title>Прохождение теста</Typography.Title>
        {isFetchingDetails || !normalizedDetails ? (
          <Loader />
        ) : (
          <ExamDetail initialValues={normalizedDetails} onSave={handleFinishExam} isSaving={isPassingExam}/>
        )}
      </Layout.Content>
      <Layout.Sider width={500} className="fullHeight">
        {/* @ts-ignore */}
        <Button htmlType="submit" form='exam' loading={isPassingExam} disabled={isPassingExam}>
          Завершить тест
        </Button>
      </Layout.Sider>
    </Layout>
  );
}
