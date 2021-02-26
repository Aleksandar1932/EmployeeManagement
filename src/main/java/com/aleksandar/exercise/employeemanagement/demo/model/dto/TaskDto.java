package com.aleksandar.exercise.employeemanagement.demo.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class TaskDto {
    private Long projectId;

    private String description;

    private String createdByUsername;
}
