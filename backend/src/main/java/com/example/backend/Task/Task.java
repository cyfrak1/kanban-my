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
    @Column(nullable = false)
    private String taskTitle;
    private String taskDescription;
    @Column(nullable = false)
    private String taskDeadlineTime;
    @Column(name = "bucket_id", insertable = false, updatable = false)
    private Integer bucketId;
    @ManyToOne
    @JoinColumn(name="bucket_id", nullable = false, referencedColumnName="id")
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
        return bucketId;
    }

    public void setBucketID(Integer bucketId) {
        this.bucketId = bucketId;
    }

    public Bucket getBucket() {
        return bucket;
    }

    public void setBucket(Bucket bucket) {
        this.bucket = bucket;
    }

    public Integer getBucketId() {
        return bucketId;
    }

    public void setBucketId(Integer bucketId) {
        this.bucketId = bucketId;
    }
}
