package com.example.backend.bucket;

import com.example.backend.task.Task;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Bucket {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String bucketName;
    @JsonBackReference
    @OneToMany(mappedBy = "bucket", cascade = CascadeType.REMOVE)
    Set<Task> tasks;
    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public int getId() {
        return id;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public String getBucketName() {
        return bucketName;
    }
}
