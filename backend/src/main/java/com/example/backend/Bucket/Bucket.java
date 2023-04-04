package com.example.backend.Bucket;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Bucket {
    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    private int bucketId;
    private String bucketName;

    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }
}
