package com.aleksandar.exercise.employeemanagement.demo.model.exceptions;

public class ManagerWithUsernameDoesNotExistException  extends RuntimeException{
    public ManagerWithUsernameDoesNotExistException(String username) {
        super(String.format("Manager with username: %s doesn't exist", username));
    }
}
