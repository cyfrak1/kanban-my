package com.example.backend.label;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/label")
public class LabelController {
    @Autowired
    private LabelService labelService;
    @PostMapping("/add")
    private ResponseEntity<String> add(@RequestBody Label label) {
        labelService.addLabel(label);
        return ResponseEntity.ok("Label has been added successfully");
    }
    @GetMapping("/getAllLabels/{taskId}")
    private ResponseEntity<List<Label>> getAllLabels(@PathVariable int taskId) {
        return ResponseEntity.ok(labelService.getAllLabels(taskId));
    }
        @DeleteMapping("/delete/{labelId}")
    private ResponseEntity<String> delete(@PathVariable int labelId) {
        labelService.delteLabel(labelId);
        return ResponseEntity.ok("Label has been deleted successfully");
    }
    @PatchMapping("/update/{labelId}")
    private ResponseEntity<String> update(@PathVariable int labelId, @RequestBody String labelName){
        labelService.updateLabel(labelId,labelName);
        return ResponseEntity.ok("Label has been updated successfully");
    }
}
