package com.example.backend.Task;

public interface TaskService {
    public Task getTask(Integer bucketId, Integer taskId);
    public Task getAllTasks(Integer bucketId);
    public void deleteTask(Integer bucketId, Integer taskId);
    public void updateTask(Integer bucketId, Task task);
}
