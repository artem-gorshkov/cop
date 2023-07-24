package ru.mil.cop.test;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "tests", path = "tests")
public interface TestRepository extends CrudRepository<TestEntity, Integer> {
    List<Integer> findByName(@Param("name") String name);
}
