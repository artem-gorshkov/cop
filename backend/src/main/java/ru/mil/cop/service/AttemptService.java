package ru.mil.cop.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mil.cop.exam.ExamEntity;
import ru.mil.cop.model.Attempt;
import ru.mil.cop.model.AttemptStatus;
import ru.mil.cop.model.User;
import ru.mil.cop.repository.AttemptRepository;
import ru.mil.cop.repository.UserRepository;

@Service
public class AttemptService {

    private final UserRepository userRepository;
    private final AttemptRepository attemptRepository;

    public AttemptService(UserRepository userRepository, AttemptRepository attemptRepository) {
        this.userRepository = userRepository;
        this.attemptRepository = attemptRepository;
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

        Attempt attempt = new Attempt();
        attempt.setUser(user);
        attempt.setExam(exam);
        attempt.setAttemptStatus(AttemptStatus.START);
        attemptRepository.save(attempt);

        return true;
    }
}
