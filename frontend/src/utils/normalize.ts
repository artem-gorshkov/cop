import { Exam, ExamPayload, QuestionPayload } from "types/exam";

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
          if (currentValue.isRightAnswer) result.rightAnswer.push(index);
          return result;
        }, { answers: {}, rightAnswer: [] });
      return { answers, rightAnswer, text: question.text }
    }),
  }
}

export function normalizeExamPayload(data: ExamPayload): Exam {
  return {
    ...data,
    questions: data.questions?.map(question => ({
      text: question.text,
      answers: Object.values(question.answers).map((value, index) => ({
        text: value,
        isRightAnswer: question.rightAnswer.some(currentIndex => currentIndex === index + 1)
      }))
    })),
  };
}
