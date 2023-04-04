package com.example.backend.Bucket;

import java.util.List;

public interface BucketService {
    public Bucket saveBucket(Bucket bucket);
    public List<Bucket> getAllBuckets();

    public void deleteBucket(Integer bucketId);
}
