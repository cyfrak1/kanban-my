package com.example.backend.bucket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/bucket")
public class BucketController {
    @Autowired
    private BucketService bucketService;
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Bucket bucket){
        bucketService.saveBucket(bucket);
        return ResponseEntity.ok("Bucket has been added successfully");
    }
    @GetMapping("/getAllBuckets")
    public ResponseEntity<List<Bucket>> getAllBuckets() {
        return ResponseEntity.ok(bucketService.getAllBuckets());
    }
    @DeleteMapping("/delete/{bucketId}")
    public ResponseEntity<String> delete(@PathVariable Integer bucketId){
        bucketService.deleteBucket(bucketId);
        return ResponseEntity.ok("Bucket has been deleted");
    }
    @PutMapping("/update/{bucketId}")
    public ResponseEntity<String> update(@PathVariable Integer bucketId, @RequestBody String bucketName){
        bucketService.updateBucket(bucketId,bucketName);
        return ResponseEntity.ok("Bucket has been updated");
    }
}
