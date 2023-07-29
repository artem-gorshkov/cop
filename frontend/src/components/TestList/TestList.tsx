'use client';

import { Button, Row } from "antd";
import { Test } from "types/test";
import { ROUTES } from "constants/routes";
import { Link } from "react-router-dom";
import styles from './TestList.scss';
import { useQuery } from "@tanstack/react-query";
import Api from "services/api";
import Loader from "components/Loader";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import cx from "classnames";

interface TestListProps {
  isEntitled?: boolean;
}

export default function TestList({ isEntitled = false }: TestListProps) {
  const { data, isFetching } = useQuery<Test[]>({
    queryKey: ['tests'],
    queryFn: () => Api.getTests(),
    initialData: [],
  });

  return (
    <div className={styles.testList}>
      {isFetching ? (
        <Loader />
      ) : (
        data?.map((test) => (
          <Row className={cx(styles.testListItem, isEntitled && styles.isEntitled)} key={test.id}>
            <Link className={styles.testName} to={`${ROUTES.AUTH}?testId=${test.id}`}>
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
