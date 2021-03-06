package com.aleksandar.exercise.employeemanagement.demo.web.controller.rest;

import com.aleksandar.exercise.employeemanagement.demo.model.Project;
import com.aleksandar.exercise.employeemanagement.demo.model.dto.ProjectDto;
import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.ProjectCategory;
import com.aleksandar.exercise.employeemanagement.demo.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> findAll(@RequestParam(required = false) String username) {
        if(username!=null){
            return this.projectService.findAllByAssignedWorkerUsername(username);
        }
        return this.projectService.findAll();
    }


    @Secured("ROLE_MANAGER")
    @PostMapping("/add")
    public ResponseEntity<Project> save(@RequestBody ProjectDto projectDto) {
        return this.projectService.save(projectDto)
                .map(project -> ResponseEntity.ok().body(project))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @Secured("ROLE_MANAGER")
    @GetMapping("/assign/{projectId}/{username}")
    public ResponseEntity<Project> assignWorkerOnProject(@PathVariable Long projectId, @PathVariable String username) {
        return this.projectService.assignWorkerOnProject(projectId, username).map(project -> ResponseEntity.ok().body(project))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @Secured("ROLE_MANAGER")
    @GetMapping("/un-assign/{projectId}/{username}")
    public ResponseEntity<Project> unAssignWorkerOnProject(@PathVariable Long projectId, @PathVariable String username) {
        return this.projectService.unAssignWorkerOnProject(projectId, username).map(project -> ResponseEntity.ok().body(project))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @Secured("ROLE_MANAGER")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable Long id) {
        this.projectService.deleteById(id);
        if (this.projectService.findById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @Secured("ROLE_MANAGER")
    @GetMapping("/categories")
    public List<String> findAllCategories() {
        return Arrays.stream(ProjectCategory.values())
                .map(Enum::toString)
                .collect(Collectors.toList());
    }
}
