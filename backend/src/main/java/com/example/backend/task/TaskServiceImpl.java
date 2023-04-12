package com.example.backend.task;

import com.example.backend.bucket.Bucket;
import com.example.backend.bucket.BucketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepo taskRepo;

    @Autowired
    private BucketRepo bucketRepo;

    @Override
    public void addTask(Task task) {
        Bucket bucket = bucketRepo.findById(task.getBucketId()).get();
        task.setBucket(bucket);
        taskRepo.save(task);
    }
    @Override
    public Task getTask(Integer taskId) {
        Task task = taskRepo.findById(taskId).get();
        return task;
    }
    @Override
    public List<Task> getAllTasks(Integer bucketId) {
        List<Task> tasks = new ArrayList<>();
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
        Bucket bucket = bucketRepo.findById(task.getBucketId()).get();
        taskToUpdate.setTaskTitle(task.getTaskTitle());
        taskToUpdate.setTaskDescription(task.getTaskDescription());
        taskToUpdate.setTaskDeadlineTime(task.getTaskDeadlineTime());
        taskToUpdate.setBucket(bucket);
        taskToUpdate.setTaskSpotInBucket(task.getTaskSpotInBucket());
        taskRepo.save(taskToUpdate);
    }

    @Override
    public void updateAllTasks(Integer bucketId,List<Task> tasks) {
        tasks.forEach((task) -> {
            Bucket bucket = bucketRepo.findById(task.getBucketId()).get();
            task.setBucket(bucket);
            taskRepo.save(task);
        });
    }

}
