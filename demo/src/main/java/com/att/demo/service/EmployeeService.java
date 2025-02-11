package com.att.demo.service;

import com.att.demo.exception.EmployeeCollectionException;
import com.att.demo.model.Employee;
import jakarta.validation.ConstraintViolationException;
 
import java.util.List;

public interface EmployeeService {
    public void createEmployee(Employee employee) throws ConstraintViolationException, EmployeeCollectionException;
    public List<Employee> getAllEmployees();
    public Employee getSingleEmployee(String id) throws EmployeeCollectionException;
    public void updateEmployee(String id, Employee employee) throws EmployeeCollectionException;
    public void deleteEmployee(String id) throws EmployeeCollectionException;
}
