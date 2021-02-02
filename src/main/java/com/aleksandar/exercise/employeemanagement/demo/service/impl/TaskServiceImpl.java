package com.aleksandar.exercise.employeemanagement.demo.service.impl;

import com.aleksandar.exercise.employeemanagement.demo.model.Project;
import com.aleksandar.exercise.employeemanagement.demo.model.Task;
import com.aleksandar.exercise.employeemanagement.demo.model.User;
import com.aleksandar.exercise.employeemanagement.demo.model.dto.TaskDto;
import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.Role;
import com.aleksandar.exercise.employeemanagement.demo.model.exceptions.*;
import com.aleksandar.exercise.employeemanagement.demo.repository.jpa.TaskRepository;
import com.aleksandar.exercise.employeemanagement.demo.repository.jpa.UserRepository;
import com.aleksandar.exercise.employeemanagement.demo.service.ProjectService;
import com.aleksandar.exercise.employeemanagement.demo.service.TaskService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final ProjectService projectService;
    private final UserRepository userRepository;

    public TaskServiceImpl(TaskRepository taskRepository, ProjectService projectService, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.projectService = projectService;
        this.userRepository = userRepository;
    }

    @Override
    public List<Task> findAll() {
        return this.taskRepository.findAll();
    }

    @Override
    public Optional<Task> save(TaskDto taskDto) {
        Project project = this.projectService.findById(taskDto.getProjectId()).orElseThrow(() -> new ProjectWithIdDoesNotExistException(taskDto.getProjectId()));
        User createdBy = this.userRepository.findByUsername(taskDto.getCreatedByUsername()).orElseThrow(() -> new UserWithUsernameDoesNotExistException(taskDto.getCreatedByUsername()));

        Task task = new Task(project, taskDto.getDescription(), createdBy);
        return Optional.of(this.taskRepository.save(task));
    }

    @Override
    public Optional<Task> completeTask(Long taskId, String workerUsername) {
        Task task = this.taskRepository.findById(taskId).orElseThrow(() -> new TaskWithIdDoesNotExistException(taskId));
        User worker = this.userRepository.findByUsername(workerUsername).orElseThrow(() -> new UserWithUsernameDoesNotExistException(workerUsername));

        if (!worker.getRole().equals(Role.ROLE_WORKER)) {
            throw new EmployeeNotAWorkerException();
        }

        if (!this.projectService.isWorkerAssignedOnProject(task.getProject().getId(), workerUsername)) {
            throw new WorkerDoesNotWorkOnProjectException();
        }

        task.setCompletedAt(LocalDateTime.now());
        task.setIsCompleted(true);
        task.setCompletedBy(worker);

        return Optional.of(this.taskRepository.save(task));
    }

    @Override
    public List<Task> findAllByProject(Long projectId) {
        return this.taskRepository.findAllByProjectId(projectId);
    }
}
