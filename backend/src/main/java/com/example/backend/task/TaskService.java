package com.example.backend.task;

import java.util.List;

public interface TaskService {
    public void addTask(Task task);
    public Task getTask(Integer taskId);
    public List<Task> getAllTasks(Integer bucketId);
    public void deleteTask(Integer taskId);
    public void updateTask(Task task);
}
