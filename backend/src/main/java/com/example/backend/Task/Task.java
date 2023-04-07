package com.example.backend.Task;

import com.example.backend.Bucket.Bucket;
import com.example.backend.label.Label;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Task {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int taskId;
    private String taskTitle;
    private String taskDescription;
    private String taskDeadlineTime;

    private Integer bucketID;
    @ManyToOne
    @JoinColumn(name="bucket_id", nullable = false)
    private Bucket bucket;

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public String getTaskDeadlineTime() {
        return taskDeadlineTime;
    }

    public void setTaskDeadlineTime(String taskDeadlineTime) {
        this.taskDeadlineTime = taskDeadlineTime;
    }

    public Integer getBucketID() {
        return bucketID;
    }

    public void setBucketID(Integer bucketID) {
        this.bucketID = bucketID;
    }

    public Bucket getBucket() {
        return bucket;
    }

    public void setBucket(Bucket bucket) {
        this.bucket = bucket;
    }
}
