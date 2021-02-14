package com.aleksandar.exercise.employeemanagement.demo.repository.jpa;

import com.aleksandar.exercise.employeemanagement.demo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByProjectId(Long projectId);

    List<Task> findAllByProjectWorkersUsername(String username);

}
