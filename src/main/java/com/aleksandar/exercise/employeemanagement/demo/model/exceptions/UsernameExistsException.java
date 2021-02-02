package com.aleksandar.exercise.employeemanagement.demo.model.exceptions;

public class UsernameExistsException extends RuntimeException {
    public UsernameExistsException(String username) {
        super(String.format("User with username: %s already exists", username));
    }
}
