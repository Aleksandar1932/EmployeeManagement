package com.aleksandar.exercise.employeemanagement.demo.model.dto;

import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.ProjectCategory;
import lombok.Data;

@Data
public class ProjectDto {
    private String name;

    private String description;

    private String location;

    private String managerUsername;

    private ProjectCategory category;

    private Double budget;
}
