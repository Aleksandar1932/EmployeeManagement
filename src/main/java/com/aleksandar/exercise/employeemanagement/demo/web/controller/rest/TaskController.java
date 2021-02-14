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
@CrossOrigin(origins = "http://localhost:3000")
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
    public List<Task> findAll(
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) String username

            ) {
        if (projectId != null && username == null) {
            return this.taskService.findAllByProject(projectId);
        }
        else if (projectId == null && username != null) {
            return this.taskService.findAllByAssignedWorkerUsername(username);
        }
        else{
            return this.taskService.findAll();
        }



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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable Long id) {
        this.taskService.deleteById(id);
        if (this.taskService.findById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

}
