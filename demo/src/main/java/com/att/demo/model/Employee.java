package com.att.demo.model;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

/*import lombok.Setter;
import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor*/
@Document(collection="employees")
public class Employee {
    @Id
    private String id;

    @NotNull(message = "First name cannot be Null")
    private String firstName;

    @NotNull(message = "Last name cannot be Null")
    private String lastName;

    // private Date dob;

    @NotNull(message = "Department cannot be Null")
    private String department;

    @NotNull(message = "Position cannot be Null")
    private String position;

    @NotNull(message = "Manager name cannot be Null")
    private String managerName;

    @NotNull(message = "Phone number cannot be Null")
    private String phone;

    @NotNull(message = "Email cannot be Null")
    private String email;

    @NotNull(message = "Salary cannot be Null")
    private int salary;

    @NotNull(message = "Password cannot be Null")
    private String password;

    public Employee(String id, String firstName, String lastName, String department, String position, String managerName, String phone, String email, int salary, String password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
        this.position = position;
        this.managerName = managerName;
        this.phone = phone;
        this.email = email;
        this.salary = salary;
        this.password = password;
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getId() {
        return this.id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getFirstName() {
        return this.firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getLastName() {
        return this.lastName;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
    public String getDepartment() {
        return this.department;
    }

    public void setPosition(String position) {
        this.position = position;
    }
    public String getPosition() {
        return this.position;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }
    public String getManagerName() {
        return this.managerName;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getPhone() {
        return this.phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return this.email;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }
    public int getSalary() {
        return this.salary;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword() {
        return this.password;
    }
}
