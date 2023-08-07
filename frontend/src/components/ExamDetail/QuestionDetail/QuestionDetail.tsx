'use client';

import { Button, Checkbox, Form, Input, Row } from "antd";
import { requiredRule } from "constants/rules";
import styles from "./QuestionDetail.scss";
import { CloseOutlined } from "@ant-design/icons";
import { EMPTY_EXAM_DETAIL } from "constants/exam";
import { useAppContext } from "contexts/AppContext";

interface QuestionDetailProps {
  name: number,
  restField: { fieldKey?: number },
}

export default function QuestionDetail({ name, restField }: QuestionDetailProps) {
  const { isEntitled } = useAppContext();

  return (
    <>
      <Form.Item
        {...restField}
        name={[name, 'text']}
        rules={[requiredRule]}
      >
        <Input.TextArea placeholder='Текст вопроса' disabled={!isEntitled} />
      </Form.Item>
      <Form.List name={[name, 'answers']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name: answerName, ...restField }, index) => (
              <Row key={key} className={styles.answerWrapper}>
                <Form.Item
                  help={false}
                  name={[answerName, 'isRightAnswer']}
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  {...restField}
                  help={false}
                  name={[answerName, 'text']}
                  rules={[requiredRule]}
                >
                  <Input placeholder={`Вариант ответа ${index + 1}`} disabled={!isEntitled} />
                </Form.Item>
                {isEntitled && (
                  <Button disabled={fields.length === 1} icon={<CloseOutlined />} onClick={() => remove(answerName)} />
                )}
              </Row>
            ))}
            {isEntitled && (
              <Button className={styles.addButton} onClick={() => add(EMPTY_EXAM_DETAIL.questions?.[0].answers?.[0])}>
                Добавить ответ
              </Button>
            )}
          </>
        )}
      </Form.List>
    </>
  );
}
