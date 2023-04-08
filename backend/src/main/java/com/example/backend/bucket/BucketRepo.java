package com.example.backend.bucket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BucketRepo extends JpaRepository<Bucket,Integer> {
}
