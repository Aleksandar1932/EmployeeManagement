package com.aleksandar.exercise.employeemanagement.demo.web.controller.rest;

import com.aleksandar.exercise.employeemanagement.demo.service.ProjectService;
import com.aleksandar.exercise.employeemanagement.demo.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/statistics")
@CrossOrigin(origins = "http://localhost:3000")
public class StatisticsController {
    private final ProjectService projectService;
    private final TaskService taskService;

    public StatisticsController(ProjectService projectService, TaskService taskService) {
        this.projectService = projectService;
        this.taskService = taskService;
    }

    @GetMapping("/projects/total")
    public Integer getTotalNumberOfProjects() {
        return this.projectService.findAll().size();
    }

    @GetMapping("/projects/total/by/manager/{managerUsername}")
    public Long getTotalNumberOfProjectsForManagerUsername(@PathVariable String managerUsername) {
        return this.projectService.findAll().stream().filter(project -> project.getManager().getUsername().equals(managerUsername)).count();
    }


    @GetMapping("/projects/count/by/manager")
    public Map<Object, Long> getTotalNumberOfProjectsPerManager() {
        return this.projectService.findAll().stream().collect(Collectors.groupingBy(p -> p.getManager().getUsername(), Collectors.counting()));
    }

    @GetMapping("/tasks/total")
    public Integer getTotalNumberOfTasks() {
        return this.taskService.findAll().size();
    }
}
