package com.example.backend.Task;

import com.example.backend.Bucket.Bucket;
import com.example.backend.label.Label;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Task {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int taskId;
    private String taskTitle;
    private String taskDescription;
    private Date taskDeadlineTime;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bucketId", referencedColumnName = "bucketId")
    private Bucket bucket;

    @JsonIgnore
    @OneToMany( mappedBy = "task" )
    private Set<Label> labels = new HashSet<>();

}
