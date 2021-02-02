package com.aleksandar.exercise.employeemanagement.demo.repository.jpa;

import com.aleksandar.exercise.employeemanagement.demo.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
