package ru.mil.cop.dto;

import lombok.Data;

@Data
public class AttemptDto {

    private Integer examId;
    private String name;
    private String surname;
    private String patronymic;
    private String groupNumber;
}
