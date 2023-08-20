import { Exam } from "types/exam";

export const EMPTY_EXAM_DETAIL: Exam = {
  name: '',
  questions: [{
    text: '',
    answers: [{ text: '', isRightAnswer: false }],
  }],
}

export const ATTEMPT_STATUSES = {
  START: 'В процессе',
  FINISH: 'Завершён',
};
