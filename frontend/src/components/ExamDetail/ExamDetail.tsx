'use client';

import { Button, Card, Form, Row } from "antd";
import { Exam } from "types/exam";
import QuestionDetail from "components/ExamDetail/QuestionDetail";
import { CloseOutlined } from "@ant-design/icons";
import styles from './ExamDetail.scss';

interface ExamDetailProps {
  initialValues: Exam,
  onSave: (data: Exam) => void,
  isSaving: boolean,
}

export default function ExamDetail({ initialValues, onSave, isSaving }: ExamDetailProps) {
  return (
    <Form
      name="exam"
      onFinish={onSave}
      className={styles.form}
      initialValues={initialValues}
      autoComplete="off"
    >
      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card
                key={key}
                className={styles.card}
                title={
                  <Row className={styles.cardTitle}>
                    <span>
                      Вопрос {fields.findIndex((value) => value.key === key) + 1}
                    </span>
                    <Button disabled={fields.length === 1} icon={<CloseOutlined />} onClick={() => remove(name)}/>
                  </Row>
                }
              >
                <QuestionDetail name={name} restField={restField} />
              </Card>
            ))}
            <Row className={styles.controls}>
              <Form.Item>
                <Button onClick={add}>Добавить вопрос</Button>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={isSaving}>
                  Сохранить изменения
                </Button>
              </Form.Item>
            </Row>
          </>
        )}
      </Form.List>
    </Form>
  );
}
