'use client';

import { Button, Card, Form, Input, Row } from "antd";
import { Exam } from "types/exam";
import QuestionDetail from "components/ExamDetail/QuestionDetail";
import { CloseOutlined } from "@ant-design/icons";
import styles from './ExamDetail.scss';
import { requiredRule } from "constants/rules";
import { EMPTY_EXAM_DETAIL } from "constants/exam";
import cx from "classnames";

interface ExamDetailProps {
  initialValues: Exam,
  onSave?: (data: Exam) => void,
  isSaving?: boolean,
  isDisplayingTitle?: boolean,
  isEditable?: boolean,
  isSelectable?: boolean,
  isShowingRightAnswers?: boolean,
}

export default function ExamDetail({
  initialValues,
  onSave,
  isSaving,
  isDisplayingTitle = true,
  isEditable = false,
  isSelectable = true,
  isShowingRightAnswers = false
}: ExamDetailProps) {
  return (
    <Form
      name="exam"
      onFinish={onSave}
      className={styles.form}
      initialValues={initialValues}
      autoComplete="off"
    >
      {
        isDisplayingTitle && (
          isEditable ? (
            <Form.Item
              name='name'
              rules={[requiredRule]}
              className={styles.examName}
            >
              <Input placeholder='Название теста' />
            </Form.Item>
          ) : (
            <span className={cx(styles.examName, styles.readOnly)}>{initialValues.name}</span>
          )
        )
      }
      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Card
                key={key}
                className={styles.card}
                title={
                  <Row className={styles.cardTitle}>
                    <span>
                      Вопрос {index + 1}
                    </span>
                    {isEditable && (
                      <Button disabled={fields.length === 1} icon={<CloseOutlined />} onClick={() => remove(name)} />
                    )}
                  </Row>
                }
              >
                <QuestionDetail
                  name={name}
                  restField={restField}
                  isEditable={isEditable}
                  {...(!isEditable && { questionIndex: index, initialValues })}
                  isSelectable={isSelectable}
                />
                {isShowingRightAnswers && (
                  <span className={styles.rightAnswers}>
                    Правильные ответы: {initialValues?.questions?.[index]?.rightAnswer?.join(', ')}
                  </span>
                )}
              </Card>
            ))}
            {isEditable && (
              <Row className={styles.controls}>
                <Form.Item>
                  <Button onClick={() => add(EMPTY_EXAM_DETAIL.questions?.[0])}>Добавить вопрос</Button>
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" loading={isSaving} disabled={isSaving}>
                    Сохранить изменения
                  </Button>
                </Form.Item>
              </Row>
            )}
          </>
        )}
      </Form.List>
    </Form>
  );
}
