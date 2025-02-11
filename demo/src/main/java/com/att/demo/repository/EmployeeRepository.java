package com.att.demo.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.att.demo.model.Employee;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

    //@Query("{'employee': ?0")
    //abstract Optional<Employee> findById(String id);
}
