package com.aleksandar.exercise.employeemanagement.demo.service.impl;

import com.aleksandar.exercise.employeemanagement.demo.model.Project;
import com.aleksandar.exercise.employeemanagement.demo.model.User;
import com.aleksandar.exercise.employeemanagement.demo.model.dto.ProjectDto;
import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.ProjectCategory;
import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.Role;
import com.aleksandar.exercise.employeemanagement.demo.model.exceptions.*;
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

    @Override
    public Optional<Project> save(ProjectDto projectDto) {
        User manager = this.userRepository.findByUsername(projectDto.getManagerUsername())
                .orElseThrow(() -> new ManagerWithUsernameDoesNotExistException(projectDto.getManagerUsername()));
        Project project = new Project(projectDto.getName(), projectDto.getDescription(), projectDto.getLocation(), manager, projectDto.getCategory(), projectDto.getBudget());

        return Optional.of(this.projectRepository.save(project));
    }

    @Override
    public Optional<Project> findById(Long id) {
        return this.projectRepository.findById(id);
    }

    @Override
    public Optional<Project> assignWorkerOnProject(Long projectId, String username) {
        Project project = this.findById(projectId).orElseThrow(() -> new ProjectWithIdDoesNotExistException(projectId));

        User worker = userRepository.findByUsername(username).orElseThrow(() -> new UserWithUsernameDoesNotExistException(username));

        if (!worker.getRole().equals(Role.ROLE_WORKER)) {
            throw new EmployeeNotAWorkerException();
        }

        project.getWorkers().add(worker);
        return Optional.of(this.projectRepository.save(project));
    }

    @Override
    public Optional<Project> unAssignWorkerOnProject(Long projectId, String username) {
        Project project = this.findById(projectId).orElseThrow(() -> new ProjectWithIdDoesNotExistException(projectId));
        User worker = userRepository.findByUsername(username).orElseThrow(() -> new UserWithUsernameDoesNotExistException(username));

        if (!project.getWorkers().contains(worker)) {
            throw new WorkerDoesNotWorkOnProjectException();
        }

        project.getWorkers().remove(worker);
        return Optional.of(this.projectRepository.save(project));
    }

    @Override
    public Boolean isWorkerAssignedOnProject(Long projectId, String username) {
        Project project = this.projectRepository.findById(projectId).orElseThrow(() -> new ProjectWithIdDoesNotExistException(projectId));
        User worker = userRepository.findByUsername(username).orElseThrow(() -> new UserWithUsernameDoesNotExistException(username));

        return project.getWorkers().contains(worker);
    }

    @Override
    public void deleteById(Long id) {
        this.projectRepository.deleteById(id);
    }
}
