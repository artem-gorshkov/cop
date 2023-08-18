package ru.mil.cop.dto;

import lombok.Data;
import ru.mil.cop.exam.Question;

import java.util.List;

@Data
public class ExamSubmissionDto {
        private List<Question> questions;
        private List<List<Integer>> answers;
}
