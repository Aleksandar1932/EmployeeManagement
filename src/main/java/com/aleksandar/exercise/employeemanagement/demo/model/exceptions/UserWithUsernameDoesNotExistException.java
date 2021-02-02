package com.aleksandar.exercise.employeemanagement.demo.model.exceptions;

public class UserWithUsernameDoesNotExistException extends RuntimeException {
    public UserWithUsernameDoesNotExistException(String username) {
        super(String.format("User with username: %s doesn't exist", username));
    }
}
