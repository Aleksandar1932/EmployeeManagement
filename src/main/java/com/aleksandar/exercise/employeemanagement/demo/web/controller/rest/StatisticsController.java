package com.aleksandar.exercise.employeemanagement.demo.web.controller.rest;

import com.aleksandar.exercise.employeemanagement.demo.model.Task;
import com.aleksandar.exercise.employeemanagement.demo.service.ProjectService;
import com.aleksandar.exercise.employeemanagement.demo.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.DoubleSummaryStatistics;
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
        return this.projectService
                .findAll()
                .stream()
                .filter(project -> project.getManager().getUsername().equals(managerUsername))
                .count();
    }


    @GetMapping("/projects/count/by/manager")
    public Map<Object, Long> getTotalNumberOfProjectsPerManager() {
        return this.projectService
                .findAll()
                .stream()
                .collect(Collectors.groupingBy(p -> p.getManager().getUsername(), Collectors.counting()));
    }

    @GetMapping("/projects/count/by/category")
    public Map<Object, Long> getTotalNumberOfProjectsPerCategory() {
        return this.projectService
                .findAll()
                .stream()
                .collect(Collectors.groupingBy(p -> p.getCategory().toString(), Collectors.counting()));
    }

    @GetMapping("/tasks/total")
    public Integer getTotalNumberOfTasks() {
        return this.taskService.findAll().size();
    }

    @GetMapping("/tasks/count/completed/by/day")
    public Map<Object, Long> getCompletedTasksPerDay() {
        return this.taskService
                .findAll()
                .stream()
                .filter(Task::getIsCompleted)
                .collect(Collectors.groupingBy(task -> task.getCompletedAt().toString(), Collectors.counting()));
    }

    @GetMapping("/tasks/count/completed/by/employee")
    public Map<Object, Long> getCompletedTasksPerEmployee() {
        return this.taskService
                .findAll()
                .stream()
                .filter(Task::getIsCompleted)
                .collect(Collectors.groupingBy(task -> task.getCompletedBy().getUsername(), Collectors.counting()));
    }

    @GetMapping("/tasks/status")
    public Map<String, Long> getTasksStatusDistribution() {
        return this.taskService
                .findAll()
                .stream()
                .collect(Collectors.groupingBy(task -> task.getIsCompleted().toString(), Collectors.counting()));
    }

    @GetMapping("/tasks/completionTime")
    public Map<Long, Long> getCompletionTimePerTask() {
        /*
         *   Key: TaskId
         *   Value: Completion Time = (createdAt - completedAt) in seconds
         */
        return this.taskService.findAll().stream()
                .filter(Task::getIsCompleted)
                .map(task -> Map.entry(task.getId(), Math.abs(Duration.between(task.getCompletedAt(), task.getCreatedAt()).toSeconds())))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue));

    }

    @GetMapping("/tasks/completionTime/stats")
    public Map<String, Double> getDescriptiveStatisticsForCompletionTime() {
        DoubleSummaryStatistics summaryStatistics = new DoubleSummaryStatistics();
        this.getCompletionTimePerTask().values().forEach(summaryStatistics::accept);

        return Map.of(
                "count", summaryStatistics.getCount() * 1.0,
                "min", summaryStatistics.getMin(),
                "max", summaryStatistics.getMax(),
                "average", summaryStatistics.getAverage()
        );
    }
}
