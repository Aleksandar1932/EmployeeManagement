package com.aleksandar.exercise.employeemanagement.demo.service;

import com.aleksandar.exercise.employeemanagement.demo.model.Task;
import com.aleksandar.exercise.employeemanagement.demo.model.dto.TaskDto;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    List<Task> findAll();

    Optional<Task> save(TaskDto taskDto);

    Optional<Task> completeTask(Long taskId, String username);

    List<Task> findAllByProject(Long projectId);

    List<Task> findAllByAssignedWorkerUsername(String username);
}
