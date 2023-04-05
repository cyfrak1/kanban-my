package com.example.backend.Bucket;

import com.example.backend.Task.Task;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Bucket {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int bucketId;
    private String bucketName;
    @JsonIgnore
    @OneToMany( mappedBy = "bucket")
    private Set<Task> tasks = new HashSet<>();

    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }
}
