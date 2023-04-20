package com.example.backend.task;

import com.example.backend.bucket.BucketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private BucketRepo bucketRepo;
    @GetMapping("/getTask/{taskId}")
    private  ResponseEntity<Task> getTask(@PathVariable int taskId) {
        return ResponseEntity.ok(taskService.getTask(taskId));
    }
    @GetMapping("/getAllTasks/{bucketId}")
    private ResponseEntity<List<Task>> getAllTasks(@PathVariable int bucketId) {
        return ResponseEntity.ok(taskService.getAllTasks(bucketId));
    }
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Task task) {
        System.out.println(task);
        taskService.addTask(task);
        return ResponseEntity.ok("Task has been added successfully");
    }
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Task task){
        taskService.updateTask(task);
        return ResponseEntity.ok("Task has been updated successfully");
    }
    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<String> delete(@PathVariable Integer taskId){
        this.taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task has been deleted successfully");
    }
    @PutMapping("/updateAllTasks/{bucketId}")
    public ResponseEntity<String> updateAllTasks(@PathVariable Integer bucketId, @RequestBody List<Task> tasks){
        this.taskService.updateAllTasks(bucketId,tasks);
        return ResponseEntity.ok("Tasks have been updated successfully");
    }
}
