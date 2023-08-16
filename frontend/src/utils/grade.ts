import { GRADE_LIST } from "constants/grade";
import type { GradeDetails } from "types/grade";

export function getGrade(fraction?: number): GradeDetails {
  return fraction ?
    (
      fraction >= 0.75 ? GRADE_LIST.EXCELLENT :
        fraction >= 0.5 ? GRADE_LIST.GOOD :
          fraction >= 0.25 ? GRADE_LIST.SATISFACTORY : GRADE_LIST.UNSATISFACTORY
    )
    : GRADE_LIST.UNSATISFACTORY;
}
