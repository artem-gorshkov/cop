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
  answers: { [key: number]: string },
  rightAnswer: number[]
}

export interface ExamPayload {
  id?: number;
  name: string;
  questions?: QuestionPayload[];
}
