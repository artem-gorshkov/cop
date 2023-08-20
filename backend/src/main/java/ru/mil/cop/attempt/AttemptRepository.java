package ru.mil.cop.attempt;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.mil.cop.attempt.AttemptEntity;
import ru.mil.cop.attempt.AttemptStatus;

import java.util.List;

@Repository
public interface AttemptRepository extends CrudRepository<AttemptEntity, Integer> {

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

    AttemptEntity findByUserIdAndExamId(Integer userId, Integer examId);

    List<AttemptEntity> findByExamId(Integer examId);
}

