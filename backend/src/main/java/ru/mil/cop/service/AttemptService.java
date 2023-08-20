package ru.mil.cop.service;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import ru.mil.cop.dto.ExamSubmissionDto;
import ru.mil.cop.exam.ExamEntity;
import ru.mil.cop.exam.ExamRepository;
import ru.mil.cop.exam.Question;
import ru.mil.cop.model.Attempt;
import ru.mil.cop.model.AttemptStatus;
import ru.mil.cop.model.User;
import ru.mil.cop.repository.AttemptRepository;
import ru.mil.cop.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class AttemptService {

    private final UserRepository userRepository;
    private final AttemptRepository attemptRepository;
    private final ExamRepository examRepository;

    public Integer getUserId(String username, String surname, String patronymic, String groupNumber) {
        if (!userRepository.existsByUsernameAndSurnameAndPatronymicAndGroupNumber(
                username, surname, patronymic, groupNumber)) {
            User user = new User();
            user.setUsername(username);
            user.setSurname(surname);
            user.setPatronymic(patronymic);
            user.setGroupNumber(groupNumber);
            userRepository.save(user);
        }
        return userRepository.findIdByUsernameAndSurnameAndPatronymicAndGroupNumber(username, surname, patronymic, groupNumber);
    }

    @Transactional
    public boolean checkUserAttempt(Integer userId, Integer examId) {
        if (attemptRepository.existsByUserAndExam(userId, examId)) {
            AttemptStatus attemptStatus = attemptRepository.findAttemptStatusByUserAndExam(userId, examId);
            return attemptStatus != null && attemptStatus != AttemptStatus.FINISH;
        }

        User user = new User();
        user.setId(userId);

        ExamEntity exam = new ExamEntity();
        exam.setId(examId);

        Attempt attempt = new Attempt();
        attempt.setUser(user);
        attempt.setExam(exam);
        attempt.setAttemptStatus(AttemptStatus.START);
        attemptRepository.save(attempt);

        return true;
    }

    public Integer findAttemptIdByUserAndExam(Integer userId, Integer examId) {
        return attemptRepository.findByUserIdAndExamId(userId, examId).getId();
    }


    public Attempt finishTest(Long attemptId, ExamSubmissionDto examSubmissionDto) {
        Attempt attempt = findAttempt(attemptId);
        int totalCorrectAnswers = calculateCorrectAnswers(examSubmissionDto.getAnswers(), attempt.getExam().getQuestions());
        attempt.setTotalCorrectAnswers(totalCorrectAnswers);
        attempt.setUserAnswers(examSubmissionDto.getAnswers());
        attempt.setAttemptStatus(AttemptStatus.FINISH);
        return attemptRepository.save(attempt);
    }

    private static int calculateCorrectAnswers(List<List<Integer>> userAnswers, List<Question> questions) {
        int totalCorrectAnswers = 0;

        for (int i = 0; i < userAnswers.size(); i++) {
            List<Integer> userChoice = userAnswers.get(i);
            List<Integer> correctChoice = questions.get(i).getRightAnswer();

            if (userChoice.equals(correctChoice)) {
                totalCorrectAnswers++;
            }
        }

        return totalCorrectAnswers;
    }

    private Attempt findAttempt(Long attemptId) {
        return attemptRepository.findById(attemptId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Попытки с id: " + attemptId + "не существует"));
    }
}
