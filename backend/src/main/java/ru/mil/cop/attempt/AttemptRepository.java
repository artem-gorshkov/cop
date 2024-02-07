package ru.mil.cop.attempt;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttemptRepository extends CrudRepository<AttemptEntity, Integer> {

    AttemptEntity findByUserIdAndExamId(Integer userId, Integer examId);

    List<AttemptEntity> findByExamId(Integer examId);

    List<AttemptEntity> findByExamIdAndUserGroupNumber(Integer examId, String groupNumber);

    void deleteAllByExamId(Integer id);
}

