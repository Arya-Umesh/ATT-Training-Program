package com.att.demo.service;

import com.att.demo.exception.EmployeeCollectionException;
import com.att.demo.model.Employee;
import com.att.demo.repository.EmployeeRepository;
import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    @Autowired
    private EmployeeRepository employeeRepo;

    @Override
    public void createEmployee(Employee employee) throws ConstraintViolationException, EmployeeCollectionException {
        Optional<Employee> employeeOptional = employeeRepo.findById(employee.getId());
        if(employeeOptional.isPresent()) {
            throw new EmployeeCollectionException(EmployeeCollectionException.EmployeeAlreadyExists(employee.getId()));
        }
        else {
            employeeRepo.save(employee);
        }
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeRepo.findAll();
        if(employees.size() > 0) {
            return employees;
        }
        else {
            return new ArrayList<Employee>();
        }
    }

    @Override
    public Employee getSingleEmployee(String id) throws EmployeeCollectionException {
        Optional<Employee> optionalEmployee = employeeRepo.findById(id);
        if(optionalEmployee.isPresent()) {
            return optionalEmployee.get();
        }
        else {
            throw new EmployeeCollectionException(EmployeeCollectionException.NotFoundException(id));
        }
    }

    @Override
    public void updateEmployee(String id, Employee employee) throws EmployeeCollectionException {
        Optional<Employee> employeeOptional = employeeRepo.findById(id);

        if(employeeOptional.isPresent()) {
            Employee employeeToUpdate = employeeOptional.get();

            employeeToUpdate.setFirstName(employee.getFirstName() != null ? employee.getFirstName() : employeeToUpdate.getFirstName());
            employeeToUpdate.setLastName(employee.getLastName() != null ? employee.getLastName() : employeeToUpdate.getLastName());
            employeeToUpdate.setDepartment(employee.getDepartment() != null ? employee.getDepartment() : employeeToUpdate.getDepartment());
            employeeToUpdate.setPosition(employee.getPosition() != null ? employee.getPosition() : employeeToUpdate.getPosition());
            employeeToUpdate.setManagerName(employee.getManagerName() != null ? employee.getManagerName() : employeeToUpdate.getManagerName());
            employeeToUpdate.setPhone(employee.getPhone() != null ? employee.getPhone() : employeeToUpdate.getPhone());
            employeeToUpdate.setEmail(employee.getEmail() != null ? employee.getEmail() : employeeToUpdate.getEmail());
            employeeToUpdate.setSalary(employee.getSalary() != 0 ? employee.getSalary() : employeeToUpdate.getSalary());
            employeeToUpdate.setPassword(employee.getPassword() != null ? employee.getPassword() : employeeToUpdate.getPassword());

            employeeRepo.save(employeeToUpdate);
        }
        else {
            throw new EmployeeCollectionException(EmployeeCollectionException.NotFoundException(id));
        }
    }

    @Override
    public void deleteEmployee(String id) throws EmployeeCollectionException {
        Optional<Employee> employeeOptional = employeeRepo.findById(id);
        if(employeeOptional.isPresent()) {
            employeeRepo.deleteById(id);
        }
        else {
            throw new EmployeeCollectionException(EmployeeCollectionException.NotFoundException(id));
        }
    }
}
