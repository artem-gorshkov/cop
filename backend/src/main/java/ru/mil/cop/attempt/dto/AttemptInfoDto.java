package ru.mil.cop.attempt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AttemptInfoDto {
    private Integer attemptId;
    private Integer examId;
    private String name;
    private String surname;
    private String patronymic;
    private String groupNumber;
    private Integer rightCount;
    private Integer totalCount;
}
