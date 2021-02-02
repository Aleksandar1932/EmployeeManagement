package com.aleksandar.exercise.employeemanagement.demo.web.controller.rest;

import com.aleksandar.exercise.employeemanagement.demo.model.Task;
import com.aleksandar.exercise.employeemanagement.demo.model.dto.TaskDto;
import com.aleksandar.exercise.employeemanagement.demo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    /*

     Optional<Task> save(TaskDto taskDto);

    Optional<Task> completeTask(Long taskId, String username);

    List<Task> findAllByProject(Long projectId);
     */
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/all")
    public List<Task> findAll(@RequestParam(required = false) Long projectId) {
        if (projectId == null) {
            return this.taskService.findAll();
        }
        return this.taskService.findAllByProject(projectId);
    }

    @PostMapping("/add")
    public ResponseEntity<Task> save(@RequestBody TaskDto taskDto, Principal principal) {
        String username = principal.getName();
        taskDto.setCreatedByUsername(username);

        return this.taskService.save(taskDto)
                .map(task -> ResponseEntity.ok().body(task))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/complete/{taskId}/{workerUsername}")
    public ResponseEntity<Task> completeTaskByWorker(@PathVariable Long taskId, @PathVariable String workerUsername) {
        return this.taskService.completeTask(taskId, workerUsername)
                .map(task -> ResponseEntity.ok().body(task))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    //TODO: This handler is intended to provide API for the worker to manually mark a task as done.
    @GetMapping("/complete/{taskId}")
    public ResponseEntity<Task> completeTaskByCurrentWorker(@PathVariable Long taskId, Principal principal) {
        String workerUsername = principal.getName();
        return this.taskService.completeTask(taskId, workerUsername)
                .map(task -> ResponseEntity.ok().body(task))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }


}
