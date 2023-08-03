export interface Answer {
  text: string;
  isRightAnswer: boolean;
}

export interface Question {
  text: string;
  answers: Answer[];
}

export interface Exam {
  id?: number;
  name: string;
  questions?: Question[];
}

export interface QuestionPayload {
  text: string;
  answers: { [key: string]: string },
  rightAnswer: number[]
}

export interface ExamPayload {
  name: string;
  questions?: QuestionPayload[];
}
