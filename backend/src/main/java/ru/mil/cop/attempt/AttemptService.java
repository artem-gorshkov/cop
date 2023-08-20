package ru.mil.cop.attempt;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import ru.mil.cop.attempt.dto.AttemptSubmissionDto;
import ru.mil.cop.exam.ExamEntity;
import ru.mil.cop.exam.Question;
import ru.mil.cop.auth.model.User;
import ru.mil.cop.auth.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class AttemptService {

    private final UserRepository userRepository;
    private final AttemptRepository attemptRepository;

    public AttemptEntity findAttempt(Integer attemptId) {
        return attemptRepository.findById(attemptId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Попытки с id: " + attemptId + "не существует"));
    }

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

        AttemptEntity attemptEntity = new AttemptEntity();
        attemptEntity.setUser(user);
        attemptEntity.setExam(exam);
        attemptEntity.setAttemptStatus(AttemptStatus.START);
        attemptRepository.save(attemptEntity);

        return true;
    }

    public Integer findAttemptIdByUserIdAndExamId(Integer userId, Integer examId) {
        return attemptRepository.findByUserIdAndExamId(userId, examId).getId();
    }


    public AttemptEntity finishTest(Integer attemptId, AttemptSubmissionDto attemptSubmissionDto) {
        AttemptEntity attemptEntity = findAttempt(attemptId);
        int totalCorrectAnswers = calculateCorrectAnswers(attemptSubmissionDto.getAnswers(), attemptEntity.getExam().getQuestions());
        attemptEntity.setTotalCorrectAnswers(totalCorrectAnswers);
        attemptEntity.setUserAnswers(attemptSubmissionDto.getAnswers());
        attemptEntity.setAttemptStatus(AttemptStatus.FINISH);
        return attemptRepository.save(attemptEntity);
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
}
