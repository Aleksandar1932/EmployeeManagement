package com.aleksandar.exercise.employeemanagement.demo.model.exceptions;

public class TaskWithIdDoesNotExistException extends RuntimeException {
    public TaskWithIdDoesNotExistException(Long id) {
        super(String.format("Task with id: %s doesn't exist", id.toString()));
    }
}
