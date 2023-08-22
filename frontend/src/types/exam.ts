export interface Answer {
  text: string;
  isRightAnswer: boolean;
}

export interface Question {
  text: string;
  answers: Answer[];
  rightAnswer?: number[];
}

export interface Exam {
  id?: number;
  name: string;
  questions?: Question[];
}

export interface QuestionPayload {
  text: string;
  answers: { [key: number]: string },
  rightAnswer: number[]
}

export interface ExamPayload {
  id?: number;
  name: string;
  questions?: QuestionPayload[];
}

export interface AnswerPayload {
  answers?: { [key: number]: number[] };
}
