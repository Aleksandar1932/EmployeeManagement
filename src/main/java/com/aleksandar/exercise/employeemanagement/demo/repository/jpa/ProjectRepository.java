package com.aleksandar.exercise.employeemanagement.demo.repository.jpa;

import com.aleksandar.exercise.employeemanagement.demo.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findAllByWorkersUsername(String username);
}
