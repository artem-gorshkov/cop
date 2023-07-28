export interface Question {
  text: string;
  answers: {[key: string]: string};
  rightAnswer: number[];
}

export interface Test {
  id: number;
  name: string;
  questions?: Question[];
}