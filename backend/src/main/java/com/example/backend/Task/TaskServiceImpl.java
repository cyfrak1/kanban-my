package com.example.backend.Task;

import com.example.backend.Bucket.Bucket;
import com.example.backend.Bucket.BucketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private BucketRepo bucketRepo;

    @Override
    public void addTask(Task task) {
        Bucket bucket = bucketRepo.findById(task.getBucketID()).get();
        task.setBucket(bucket);
        taskRepo.save(task);
    }

    @Override
    public List<Task> getAllTasks(Integer bucketId) {
        List<Task> tasks = new ArrayList();
        tasks.addAll(bucketRepo.findById(bucketId).get().getTasks());
        return tasks;
    }

    @Override
    public void deleteTask(Integer taskId) {
        taskRepo.deleteById(taskId);
    }

    @Override
    public void updateTask(Task task) {
        Task taskToUpdate = taskRepo.findById(task.getTaskId()).get();
        taskToUpdate.setTaskTitle(task.getTaskTitle());
        taskToUpdate.setTaskDescription(task.getTaskDescription());
        taskToUpdate.setTaskDeadlineTime(task.getTaskDeadlineTime());
        taskRepo.save(taskToUpdate);
    }
}