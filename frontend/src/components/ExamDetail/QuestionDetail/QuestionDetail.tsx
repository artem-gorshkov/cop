'use client';

import { Button, Card, Form, Input, Row } from "antd";
import { requiredRule } from "constants/rules";

interface QuestionDetailProps {
  name: number,
  restField: {fieldKey?: number | undefined},
}

export default function QuestionDetail({ name, restField }: QuestionDetailProps) {
  return (
    <Form.Item
      {...restField}
      name={[name, 'text']}
      rules={[requiredRule]}
    >
      <Input.TextArea placeholder='Текст вопроса' />
    </Form.Item>
  );
}
