package ru.mil.cop.exam;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.mil.cop.attempt.AttemptEntity;
import ru.mil.cop.attempt.AttemptRepository;
import ru.mil.cop.attempt.dto.AttemptInfoDto;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@AllArgsConstructor
public class ExamController {
    public final ExamRepository examRepository;
    private final AttemptRepository attemptRepository;
    private final ExamService examService;

    @GetMapping("/api/exam/names")
    public List<ExamNameDto> getExamNames() {
        return StreamSupport.stream(examRepository.findAll().spliterator(), false)
                .map(it -> new ExamNameDto(it.getId(), it.getName()))
                .sorted(Comparator.comparing(ExamNameDto::getName))
                .collect(Collectors.toList());
    }

    @GetMapping("/api/exam/{examId}/withoutAnswers")
    public ExamEntity getExamWithoutAnswers(@PathVariable Integer examId) {
        ExamEntity examEntity = getExamEntity(examId);
        examEntity.getQuestions().forEach(it -> it.setRightAnswer(null));
        return examEntity;
    }

    @GetMapping("/api/exam/attempts/{examId}")
    public ExamResultDto getExamAttempts(@PathVariable Integer examId, @RequestParam(name = "groupNumber", required = false) String groupNumber) {
        ExamEntity examEntity = getExamEntity(examId);

        List<AttemptInfoDto> attempts;
        if (groupNumber != null) {
            attempts = attemptRepository.findByExamIdAndUserGroupNumber(examId, groupNumber).stream()
                    .sorted(Comparator.comparingInt(AttemptEntity::getId).reversed())
                    .map(AttemptEntity::createAttemptInfoDto)
                    .collect(Collectors.toList());
        } else {
            attempts = attemptRepository.findByExamId(examId).stream()
                    .sorted(Comparator.comparingInt(AttemptEntity::getId).reversed())
                    .map(AttemptEntity::createAttemptInfoDto)
                    .collect(Collectors.toList());
        }

        return new ExamResultDto(examEntity.getName(), attempts);
    }

    @PostMapping("/api/exam/print")
    public ResponseEntity<byte[]> generateCsvFile(@RequestBody Map<String, Object> requestBody) {
        Integer examId = (Integer) requestBody.get("examId");
        String groupNumber = (String) requestBody.get("groupNumber");

        List<AttemptInfoDto> attempts = attemptRepository.findByExamIdAndUserGroupNumber(examId, groupNumber).stream()
                .sorted(Comparator.comparingInt(AttemptEntity::getId).reversed())
                .map(AttemptEntity::createAttemptInfoDto)
                .collect(Collectors.toList());

        if (!attempts.isEmpty()) {
            byte[] csvFileBytes = examService.generateCsvBytes(attempts);

            if (csvFileBytes != null) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.parseMediaType("application/csv"));
                headers.setContentDispositionFormData("attachment", "exam_results.csv");
                return new ResponseEntity<>(csvFileBytes, headers, HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    private ExamEntity getExamEntity(Integer examId) {
        return examRepository.findById(examId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Теста с id: " + examId + " не существует"));
    }
}
