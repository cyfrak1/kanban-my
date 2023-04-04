package com.example.backend.Bucket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bucket")
public class BucketController {
    @Autowired
    private BucketService bucketService;
    @PostMapping("/add")
    public String add(@RequestBody Bucket bucket){
        bucketService.saveBucket(bucket);
        return "New bucket added";
    }
    @GetMapping("/getAllBuckets")
    public List<Bucket> getAllBuckets() {
        return bucketService.getAllBuckets();
    }
    @DeleteMapping("/delete")
    public String delete(@RequestParam("id") Integer bucketId){
        bucketService.deleteBucket(bucketId);
        return "Bucket deleted";
    }
}
