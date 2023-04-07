package com.example.backend.Task;

import java.util.List;
import java.util.Set;

public interface TaskService {
    public void addTask(Task task);
    public Task getTask(Integer taskId);
    public List<Task> getAllTasks(Integer bucketId);
    public void deleteTask(Integer taskId);
    public void updateTask(Task task);
}
