'use client';

import { Button, Row } from "antd";
import { Exam, ExamPayload } from "types/exam";
import { ROUTES } from "constants/routes";
import { Link } from "react-router-dom";
import styles from './List.scss';
import { useQuery } from "@tanstack/react-query";
import Api from "services/api";
import Loader from "components/Loader";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import cx from "classnames";
import { useAppContext } from "contexts/AppContext";

export default function List() {
  const { isEntitled } = useAppContext();

  const { data, isFetching } = useQuery<ExamPayload[]>({
    queryKey: ['tests'],
    queryFn: () => Api.getExamNames(),
    initialData: [],
  });

  return (
    <div className={styles.testList}>
      {isFetching ? (
        <Loader />
      ) : (
        data?.map((test) => (
          <Row className={cx(styles.testListItem, isEntitled && styles.isEntitled)} key={test.id}>
            <Link
              className={styles.testName}
              to={isEntitled ? `${ROUTES.EDIT}/${test.id}` : `${ROUTES.AUTH}?testId=${test.id}`}
            >
              <span>{test.name}</span>
            </Link>
            {isEntitled && (
              <>
                <Button>
                  <Link to={ROUTES.ADMIN_AUTH}>
                    <SettingOutlined />
                  </Link>
                </Button>
                <Button icon={<CloseOutlined />} />
              </>
            )}
          </Row>
        ))
      )}
    </div>
  );
}
