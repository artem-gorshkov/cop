import type { UserCredentials } from "types/credentials";

export interface AttemptDetails extends UserCredentials{
  examId: number;
  rightCount: number;
  totalCount: number;
  attemptStatus: 'START' | 'FINISH';
  attemptId?: number;
  userAnswers?: number[][];
}
