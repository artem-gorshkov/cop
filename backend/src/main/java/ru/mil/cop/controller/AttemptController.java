package ru.mil.cop.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import ru.mil.cop.dto.AttemptDto;
import ru.mil.cop.dto.ExamSubmissionDto;
import ru.mil.cop.dto.FinishTestDto;
import ru.mil.cop.dto.InitTestDto;
import ru.mil.cop.model.Attempt;
import ru.mil.cop.service.AttemptService;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AttemptController {

    private final AttemptService attemptService;

    @PostMapping("/attempt/check")
    public InitTestDto initTest(@RequestBody AttemptDto attemptDto) {
        Integer userId = attemptService.getUserId(attemptDto.getName().toLowerCase(), attemptDto.getSurname().toLowerCase(),
                attemptDto.getPatronymic().toLowerCase(), attemptDto.getGroupNumber().toLowerCase());
        if (attemptService.checkUserAttempt(userId, attemptDto.getExamId())) {
            return new InitTestDto(attemptService.findAttemptIdByUserAndExam(userId, attemptDto.getExamId()));
        } else {
            throw new ResponseStatusException(HttpStatus.LOCKED, "Вы уже проходили данный тест. Свяжитесь с преподавателем для повторного прохождения");
        }
    }

    @PostMapping("/attempt/pass/{attemptId}")
    public FinishTestDto finishTest(@PathVariable Long attemptId, @RequestBody ExamSubmissionDto examSubmissionDto) {
        Attempt attempt = attemptService.finishTest(attemptId, examSubmissionDto);
        return createFinishTestDto(attempt);
    }

    private FinishTestDto createFinishTestDto(Attempt attempt) {
        return new FinishTestDto(
                attempt.getExam().getId(),
                attempt.getUser().getUsername(),
                attempt.getUser().getSurname(),
                attempt.getUser().getPatronymic(),
                attempt.getUser().getGroupNumber(),
                attempt.getTotalCorrectAnswers(),
                attempt.getExam().getQuestions().size()
        );
    }
}
