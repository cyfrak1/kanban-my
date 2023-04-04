package com.example.backend.Bucket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bucket")
public class BucketController {
    @Autowired
    private BucketService bucketService;
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Bucket bucket){
        bucketService.saveBucket(bucket);
        return ResponseEntity.ok("New bucket added");
    }
    @GetMapping("/getAllBuckets")
    public ResponseEntity<List<Bucket>> getAllBuckets() {
        return ResponseEntity.ok(bucketService.getAllBuckets());
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam("id") Integer bucketId){
        bucketService.deleteBucket(bucketId);
        return ResponseEntity.ok("Bucket deleted");
    }
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestParam("id") Integer bucketId, @RequestBody String bucketName){
        bucketService.updateBucket(bucketId,bucketName);
        return ResponseEntity.ok("Bucket updated");
    }
}
