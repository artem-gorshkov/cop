package ru.mil.cop.dto;

import lombok.Data;

import java.util.List;

@Data
public class ExamSubmissionDto {
        private List<List<Integer>> answers;
}
