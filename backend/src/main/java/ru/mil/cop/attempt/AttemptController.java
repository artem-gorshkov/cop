package ru.mil.cop.attempt;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import ru.mil.cop.attempt.dto.AttemptIdDto;
import ru.mil.cop.attempt.dto.AttemptInfoDto;
import ru.mil.cop.attempt.dto.AttemptSubmissionDto;
import ru.mil.cop.attempt.dto.CreateAttemptDto;

@RestController
@RequestMapping("/api/attempt")
@AllArgsConstructor
public class AttemptController {

    private final AttemptService attemptService;

    @GetMapping("/{attemptId}")
    public AttemptInfoDto getAttempt(@PathVariable Integer attemptId) {
        return attemptService.findAttempt(attemptId).createAttemptInfoDto();
    }

    @PostMapping("/check")
    public AttemptIdDto initTest(@RequestBody CreateAttemptDto createAttemptDto) {
        Integer userId = attemptService.getUserId(createAttemptDto.getName().toLowerCase(), createAttemptDto.getSurname().toLowerCase(),
                createAttemptDto.getPatronymic().toLowerCase(), createAttemptDto.getGroupNumber().toLowerCase());
        if (attemptService.checkUserAttempt(userId, createAttemptDto.getExamId())) {
            return new AttemptIdDto(attemptService.findAttemptIdByUserIdAndExamId(userId, createAttemptDto.getExamId()));
        } else {
            throw new ResponseStatusException(HttpStatus.LOCKED, "Вы уже проходили данный тест. Свяжитесь с преподавателем для повторного прохождения");
        }
    }

    @PostMapping("/pass/{attemptId}")
    public AttemptInfoDto finishTest(@PathVariable Integer attemptId, @RequestBody AttemptSubmissionDto attemptSubmissionDto) {
        AttemptEntity attemptEntity = attemptService.finishTest(attemptId, attemptSubmissionDto);
        return attemptEntity.createAttemptInfoDto();
    }
}
