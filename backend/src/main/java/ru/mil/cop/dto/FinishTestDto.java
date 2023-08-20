package ru.mil.cop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FinishTestDto {
    private Integer examId;
    private String name;
    private String surname;
    private String patronymic;
    private String groupNumber;
    private Integer rightCount;
    private Integer totalCount;
}
