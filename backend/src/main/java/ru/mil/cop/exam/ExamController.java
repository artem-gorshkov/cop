package ru.mil.cop.exam;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.StreamSupport;

@RestController
@AllArgsConstructor
public class ExamController {
    public final ExamRepository examRepository;

    @GetMapping("/api/exams/names")
    public List<ExamNameDto> getExamNames() {
        return StreamSupport.stream(examRepository.findAll().spliterator(), false)
                .map(it -> new ExamNameDto(it.getId(), it.getName()))
                .toList();
    }
}
