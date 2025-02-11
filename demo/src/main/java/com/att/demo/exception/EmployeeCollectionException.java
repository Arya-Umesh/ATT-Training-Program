package com.att.demo.exception;

public class EmployeeCollectionException extends Exception {
    private static final long serialVersionUID = 1L;

    public EmployeeCollectionException(String message) {
        super(message);
    }

    public static String NotFoundException(String id) {
        return "Employee with " + id + " not found!";
    }

    public static String EmployeeAlreadyExists(String id) {
        return "Employee with ID " + id + " already exists!";
    }
}
