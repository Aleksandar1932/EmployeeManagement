package com.aleksandar.exercise.employeemanagement.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Project project;

    private String description;

    private Boolean isCompleted;

    @ManyToOne
    private User completedBy;

    private LocalDateTime completedAt;

    @ManyToOne
    private User createdBy;

    private LocalDateTime createdAt;


    public Task(Project project, String description, User createdBy) {
        this.project = project;
        this.description = description;
        this.createdBy = createdBy;
        this.isCompleted = false;
        this.createdAt = LocalDateTime.now();
    }
}
