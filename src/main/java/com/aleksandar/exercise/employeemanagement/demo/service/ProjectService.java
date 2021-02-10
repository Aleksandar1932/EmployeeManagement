package com.aleksandar.exercise.employeemanagement.demo.service;

import com.aleksandar.exercise.employeemanagement.demo.model.Project;
import com.aleksandar.exercise.employeemanagement.demo.model.dto.ProjectDto;
import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.ProjectCategory;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    List<Project> findAll();

    Optional<Project> save(String name,
                           String description,
                           String location,
                           String managerUsername,
                           ProjectCategory category,
                           Double budget);

    Optional<Project> save(ProjectDto projectDto);

    Optional<Project> findById(Long id);

    Optional<Project> assignWorkerOnProject(Long projectId, String username);

    Optional<Project> unAssignWorkerOnProject(Long projectId, String username);

    Boolean isWorkerAssignedOnProject(Long projectId, String username);

    void deleteById(Long id);
}
