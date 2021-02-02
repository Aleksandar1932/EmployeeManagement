package com.aleksandar.exercise.employeemanagement.demo.model;

import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.ProjectCategory;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String description;

    private String location;

    @ManyToOne
    private User manager;

    @Enumerated(EnumType.STRING)
    private ProjectCategory category;

    private Double budget;

    public Project(String name, String description, String location, User manager, ProjectCategory category, Double budget) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.manager = manager;
        this.category = category;
        this.budget = budget;
    }
}
