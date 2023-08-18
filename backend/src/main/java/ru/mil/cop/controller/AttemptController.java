package ru.mil.cop.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mil.cop.dto.AttemptDto;
import ru.mil.cop.service.AttemptService;

@RestController
@RequestMapping("/api")
public class AttemptController {


    private final AttemptService attemptService;


    @Autowired
    public AttemptController(AttemptService attemptService) {
        this.attemptService = attemptService;
    }

    @PostMapping("/attempt/check")
    public ResponseEntity<String> initTest(@RequestBody AttemptDto attemptDto) {
        Integer userId = attemptService.getUserId(attemptDto.getName().toLowerCase(), attemptDto.getSurname().toLowerCase(),
                attemptDto.getPatronymic().toLowerCase(), attemptDto.getGroupNumber().toLowerCase());
        if (attemptService.checkUserAttempt(userId, attemptDto.getExamId())) {
            return ResponseEntity.ok("User has valid status test");
        } else {
            return ResponseEntity.status(HttpStatus.LOCKED).body("Вы уже проходили данный тест. Свяжитесь с преподавателем для повторного прохождения");
        }
    }


    //todo логику для завершения теста и подсчет баллов
    // 1) Допилить логику подсчета ответов
    // 2) Комитим результат в сущность Attempt (выделить новую переменную под это в бд)
    // 3) Меняем перечесление со Start на Finish
//    @PostMapping("/exam/pass/{id}")
//    public ResponseEntity<String> finishTest(@PathVariable Integer id, @RequestBody ExamSubmissionDto examSubmissionDto) {
//
//        List<List<Integer>> userAnswers = examSubmissionDto.getAnswers();
//        int totalCorrectAnswers = 0;
//
//        for (int i = 0; i < userAnswers.size(); i++) {
//            List<Integer> userChoice = userAnswers.get(i);
//            List<Integer> correctChoice = examSubmissionDto.getQuestions().get(i).getRightAnswer();
//
//            if (userChoice.equals(correctChoice)) {
//                totalCorrectAnswers++;
//            }
//        }
//
//        Map<String, Integer> result = new HashMap<>();
//        result.put("correctAnswers", totalCorrectAnswers);
//
//        return ResponseEntity.ok("OK");
//    }
}
