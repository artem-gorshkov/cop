import type { AnswerPayload, Exam, ExamPayload, QuestionPayload } from "types/exam";

export function normalizeExamData(data: Exam): ExamPayload {
  return {
    ...data,
    questions: data.questions?.map(question => {
      const {
        answers,
        rightAnswer
      } = question.answers.reduce<Omit<QuestionPayload, 'text'>>(
        (result, currentValue, currentIndex) => {
          const index = currentIndex + 1;
          result.answers[index] = currentValue.text;
          if (currentValue.isSelected) result.rightAnswer.push(index);
          return result;
        }, { answers: {}, rightAnswer: [] });
      return { answers, rightAnswer, text: question.text }
    }),
  }
}

export function normalizeExamPayload({ data, getAnswerSelection }: {
  data: ExamPayload,
  getAnswerSelection?: (index: number) => number[] | undefined
}): Exam {
  return {
    ...data,
    questions: data.questions?.map((question, questionIndex) => ({
      text: question.text,
      answers: Object.values(question.answers).map((value, index) => ({
        text: value,
        isSelected: !!(getAnswerSelection && getAnswerSelection(questionIndex)?.some(currentIndex => currentIndex === index + 1))
      })),
      rightAnswer: question.rightAnswer,
    })),
  };
}

export function normalizeAnswers(data: Exam): AnswerPayload {
  return {
    answers: data.questions?.map(question => {
      return question.answers.reduce<number[]>(
        (result, currentValue, currentIndex) => {
          if (currentValue.isSelected) result.push(currentIndex + 1);
          return result;
        }, []);
    }),
  }
}
