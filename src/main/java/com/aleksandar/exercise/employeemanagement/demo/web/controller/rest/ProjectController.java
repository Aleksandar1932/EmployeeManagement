package com.aleksandar.exercise.employeemanagement.demo.web.controller.rest;

import com.aleksandar.exercise.employeemanagement.demo.model.Project;
import com.aleksandar.exercise.employeemanagement.demo.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> findAll() {
        return this.projectService.findAll();
    }
}
