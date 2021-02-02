package com.aleksandar.exercise.employeemanagement.demo.model.exceptions;

public class ProjectWithIdDoesNotExistException  extends RuntimeException{
    public ProjectWithIdDoesNotExistException(Long id) {
        super(String.format("Project with id: %s doesn't exist", id.toString()));
    }
}
