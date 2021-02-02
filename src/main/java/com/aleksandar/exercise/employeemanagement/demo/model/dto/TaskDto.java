package com.aleksandar.exercise.employeemanagement.demo.model.dto;

import lombok.Data;


@Data
public class TaskDto {
    private Long projectId;

    private String description;

    private String createdByUsername;
}
