package com.aleksandar.exercise.employeemanagement.demo.service.impl;

import com.aleksandar.exercise.employeemanagement.demo.model.Project;
import com.aleksandar.exercise.employeemanagement.demo.model.User;
import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.ProjectCategory;
import com.aleksandar.exercise.employeemanagement.demo.model.exceptions.ManagerWithUsernameDoesNotExistException;
import com.aleksandar.exercise.employeemanagement.demo.repository.jpa.ProjectRepository;
import com.aleksandar.exercise.employeemanagement.demo.repository.jpa.UserRepository;
import com.aleksandar.exercise.employeemanagement.demo.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Project> findAll() {
        return this.projectRepository.findAll();
    }

    @Override
    public Optional<Project> save(String name, String description, String location, String managerUsername, ProjectCategory category, Double budget) {
        User manager = this.userRepository.findByUsername(managerUsername).orElseThrow(() -> new ManagerWithUsernameDoesNotExistException(managerUsername));
        Project project = new Project(name, description, location, manager, category, budget);

        return Optional.of(this.projectRepository.save(project));
    }
}
