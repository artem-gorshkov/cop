'use client';

import { Button, Modal, Row } from "antd";
import type { ExamPayload } from "types/exam";
import { ROUTES } from "constants/routes";
import { Link } from "react-router-dom";
import styles from './List.scss';
import { useMutation, useQuery } from "@tanstack/react-query";
import Api from "services/api";
import Loader from "components/Loader";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import cx from "classnames";
import { useAppContext } from "contexts/AppContext";

export default function List() {
  const { isEntitled } = useAppContext();

  const { data, isFetching, refetch: refetchExams } = useQuery<ExamPayload[]>({
    queryKey: ['tests'],
    queryFn: () => Api.getExamNames(),
    initialData: [],
  });

  const { mutateAsync: deleteExam, isLoading: isDeleting } = useMutation({
    mutationKey: ['delete'],
    mutationFn: Api.deleteExam,
  });

  async function handleDelete(examId?: number) {
    await deleteExam(examId);
    await refetchExams();
  }

  function showModal(examId?: number) {
    Modal.warning({
      title: 'Удалить тест?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: () => handleDelete(examId),
      okButtonProps: {
        loading: isDeleting,
      },
      okCancel: true,
      wrapClassName: styles.modal,
    });
  }

  return (
    <div className={styles.testList}>
      {isFetching ? (
        <Loader />
      ) : (
        data?.map((test) => (
          <Row className={cx(styles.testListItem, isEntitled && styles.isEntitled)} key={test.id}>
            <Link
              className={styles.testName}
              to={isEntitled ? `${ROUTES.EDIT}/${test.id}` : `${ROUTES.AUTH}?examId=${test.id}`}
            >
              <span title={test.name}>{test.name}</span>
            </Link>
            {isEntitled && (
              <>
                <Button>
                  <Link to={ROUTES.ADMIN_AUTH}>
                    <SettingOutlined />
                  </Link>
                </Button>
                <Button icon={<CloseOutlined />} onClick={() => showModal(test.id)} />
              </>
            )}
          </Row>
        ))
      )}
    </div>
  );
}
