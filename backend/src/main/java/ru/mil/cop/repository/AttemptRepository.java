package ru.mil.cop.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.mil.cop.model.Attempt;
import ru.mil.cop.model.AttemptStatus;

@Repository
public interface AttemptRepository extends CrudRepository<Attempt, Long> {

    @Query(nativeQuery = true,
            value = "SELECT CASE WHEN EXISTS "
                    + "(SELECT * FROM attempts "
                    + "WHERE user_id = :userId AND exam_id = :examId) "
                    + "THEN true ELSE false END")
    boolean existsByUserAndExam(Integer userId, Integer examId);

    @Query(nativeQuery = true,
            value = "SELECT attempt_status FROM attempts "
                    + "WHERE user_id = :userId AND exam_id = :examId LIMIT 1")
    AttemptStatus findAttemptStatusByUserAndExam(Integer userId, Integer examId);

    Attempt findByUserIdAndExamId(Integer userId, Integer examId);
}

