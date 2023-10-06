'use client';

import { Button, Input, Layout, notification, Row, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "services/api";
import { PrinterOutlined, SearchOutlined } from "@ant-design/icons";
import type { AttemptDetails } from "types/attempt";
import { ROUTES } from "constants/routes";
import styles from './AttemptList.scss';
import cx from "classnames";
import AttemptListTable from "pages/AttemptList/AttemptListTable";
import { useState } from "react";

export default function AttemptList() {
  const examId = Number(useParams().examId);
  const [groupNumber, setGroupNumber] = useState<string>('');

  const {
    data: attemptHistory,
    isFetching: isFetchingHistory,
    refetch: refetchAttemptHistory,
  } = useQuery<{
    name: string,
    attempts: AttemptDetails[]
  }>({
    queryKey: ['getAttemptList', examId],
    queryFn: () => Api.getAttemptHistory(examId, groupNumber),
  });

  function handlePrintError(error: Error) {
    notification.error({ message: error.message });
  }

  const { mutate: print, isLoading: isPrinting } = useMutation({
    mutationKey: ['printAttemptHistory'],
    mutationFn: Api.printAttemptHistory,
    onError: handlePrintError,
  });

  return (
    <Layout hasSider className={cx(styles.content, "fullHeight")}>
      <Layout.Content className={styles.title}>
        <Typography.Title>{attemptHistory?.name}</Typography.Title>
      </Layout.Content>
      <Layout.Sider width={500} className={styles.side}>
        <Button>
          <Link to={ROUTES.EXAM_LIST}>
            <span>Назад</span>
          </Link>
        </Button>
      </Layout.Sider>
      <Layout.Footer className={styles.tableWrapper}>
        <Row className={styles.tableControls}>
          <span>
            Номер группы:
          </span>
          <Input
            value={groupNumber}
            onChange={(event) => setGroupNumber(event.target.value)}
          />
          <Button
            icon={<SearchOutlined />}
            onClick={() => refetchAttemptHistory()}
            disabled={isFetchingHistory}
          />
          <Button
            icon={<PrinterOutlined />}
            onClick={() => print({examId, groupNumber})}
            disabled={isPrinting}
          />
        </Row>
        <AttemptListTable attempts={attemptHistory?.attempts} refetchAttempts={refetchAttemptHistory} />
      </Layout.Footer>
    </Layout>
  );
}
