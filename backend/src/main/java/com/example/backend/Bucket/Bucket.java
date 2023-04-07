package com.example.backend.Bucket;

import com.example.backend.Task.Task;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Bucket {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String bucketName;
    @JsonBackReference
    @OneToMany(mappedBy = "bucket")
    Set<Task> tasks;
    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public String getBucketName() {
        return bucketName;
    }
}
