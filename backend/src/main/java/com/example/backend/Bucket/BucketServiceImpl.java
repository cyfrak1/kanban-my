package com.example.backend.Bucket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BucketServiceImpl implements BucketService {
    @Autowired
    private BucketRepo bucketRepo;

    @Override
    public Bucket saveBucket(Bucket bucket) {
        return bucketRepo.save(bucket);
    }

    @Override
    public List<Bucket> getAllBuckets() {
        return bucketRepo.findAll();
    }

    @Override
    public void deleteBucket(Integer bucketId) {
        bucketRepo.deleteById(bucketId);
    }
}
