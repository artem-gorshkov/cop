'use client';

import { Row } from "antd";
import { Test } from "types/test";
import { ROUTES } from "constants/routes";
import { Link } from "react-router-dom";
import styles from './TestList.scss';

interface TestListProps {
  isEntitled?: boolean;
  data?: Test[];
}

export default function TestList({ isEntitled = false, data }: TestListProps) {
  return (
    <div className={styles.testList}>
      {data && data.map((test) => (
        <Row className={styles.testListItem} key={test.id}>
          <Link to={`${ROUTES.AUTH}?testId=${test.id}`}>
            <span>{test.name}</span>
          </Link>
        </Row>
      ))}
    </div>
  );
}
