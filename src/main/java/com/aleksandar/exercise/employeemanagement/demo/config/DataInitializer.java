package com.aleksandar.exercise.employeemanagement.demo.config;

import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.ProjectCategory;
import com.aleksandar.exercise.employeemanagement.demo.service.ProjectService;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Profile("test")
@Component
public class DataInitializer {
    private final ProjectService projectService;

    public DataInitializer(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostConstruct
    public void initData() {
        initProjects();
    }

    private void initProjects() {
        for (int i = 0; i < 10; i++) {
            projectService.save(
                    String.format("Project %d", i),
                    String.format("Description for project %d", i),
                    String.format("Location for project %d", i),
                    "aleksandar",
                    ProjectCategory.CONSTRUCTION,
                    100.0);
        }
    }

}
