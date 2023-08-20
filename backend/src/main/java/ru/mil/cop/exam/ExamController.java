package ru.mil.cop.exam;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import ru.mil.cop.attempt.AttemptEntity;
import ru.mil.cop.attempt.AttemptRepository;
import ru.mil.cop.attempt.dto.AttemptInfoDto;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController("/api/exam")
@AllArgsConstructor
public class ExamController {
    public final ExamRepository examRepository;
    private final AttemptRepository attemptRepository;

    @GetMapping("/names")
    public List<ExamNameDto> getExamNames() {
        return StreamSupport.stream(examRepository.findAll().spliterator(), false)
                .map(it -> new ExamNameDto(it.getId(), it.getName()))
                .collect(Collectors.toList());
    }

    @GetMapping("/attempts/{examId}")
    public ExamResultDto getExamAttempts(@PathVariable Integer examId) {
        ExamEntity examEntity = examRepository.findById(examId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Теста с id: " + examId + "не существует"));

        List<AttemptInfoDto> attempts = attemptRepository.findByExamId(examId).stream()
                .map(AttemptEntity::createAttemptInfoDto)
                .collect(Collectors.toList());

        return new ExamResultDto(examEntity.getName(), attempts);
    }
}
