package com.example.backend.Task;

import com.example.backend.Bucket.Bucket;
import com.example.backend.Bucket.BucketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private BucketRepo bucketRepo;
    @GetMapping("/getAllTasks/{bucketId}")
    private ResponseEntity<List<Task>> getAllTasks(@PathVariable int bucketId) {
        return ResponseEntity.ok(taskService.getAllTasks(bucketId));
    }
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Task task) {
        taskService.addTask(task);
        return ResponseEntity.ok("Task has been added successfully");
    }
    @PutMapping("/update/{taskId}")
    public ResponseEntity<String> update(@PathVariable Integer taskId, @RequestBody Task task){
        task.setTaskId(taskId);
        taskService.updateTask(task);
        return ResponseEntity.ok("Task has been updated successfully");
    }
}
