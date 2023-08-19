'use client';

import { Button, Layout, Table, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import Api from "services/api";
import { CloseOutlined, FileSearchOutlined } from "@ant-design/icons";
import type { AttemptDetails } from "types/attempt";
import { ROUTES } from "constants/routes";
import styles from './AttemptList.scss';
import cx from "classnames";
import Loader from "components/Loader";
import { useCallback } from "react";
import { getGrade } from "utils/grade";

export default function AttemptList() {
  const examId = Number(useParams().examId);

  const { data: attempts, isFetching: isFetchingAttempts } = useQuery<AttemptDetails[]>({
    queryKey: ['getAttemptList', examId],
    queryFn: () => Api.getAttemptList(examId),
  });

  const renderAnswerStats = useCallback(
    (record: AttemptDetails) => `${record.rightCount} из ${record.totalCount}`,
    []
  );

  const renderGrade = useCallback(
    (record: AttemptDetails) => {
      const grade = getGrade(record.rightCount / record.totalCount);
      return (
        <div className={cx(styles.grade, styles[grade.key.toLowerCase()])}>
          <span>{grade.text}</span>
        </div>
      );
    }, []
  );

  return (
    <Layout hasSider className={cx(styles.content, "fullHeight")}>
      <Layout.Content className={styles.title}>
        <Typography.Title>Журнал</Typography.Title>
      </Layout.Content>
      <Layout.Sider width={500} className={styles.side}>
        <Button>
          <Link to={ROUTES.EXAM_LIST}>
            <span>Назад</span>
          </Link>
        </Button>
      </Layout.Sider>
      <Layout.Footer className={styles.tableWrapper}>
        <Table
          showSorterTooltip={false}
          rowKey="attemptId"
          locale={{ emptyText: "Тест ещё не был пройден" }}
          className={styles.attemptList}
          dataSource={attempts}
          pagination={false}
          loading={{ spinning: isFetchingAttempts, indicator: <Loader /> }}
        >
          <Table.Column
            title="Фамилия"
            dataIndex="surname"
          />
          <Table.Column
            title="Имя"
            dataIndex="name"
          />
          <Table.Column
            title="Отчество"
            dataIndex="patronymic"
          />
          <Table.Column
            title="Номер группы"
            dataIndex="groupNumber"
          />
          <Table.Column
            title="Верных ответов"
            render={renderAnswerStats}
          />
          <Table.Column
            title="Оценка"
            render={renderGrade}
          />
          <Table.Column
            render={(record) => (
              <div className={styles.controlsWrapper}>
                <Button
                  icon={<FileSearchOutlined />}
                  onClick={() => console.log(record)}
                />
              </div>
            )}
          />
          <Table.Column
            render={(record) => (
              <div className={styles.controlsWrapper}>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => console.log(record)}
                />
              </div>
            )}
          />
        </Table>
      </Layout.Footer>
    </Layout>
  );
}
