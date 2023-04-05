package com.example.backend.label;

import com.example.backend.Task.Task;
import jakarta.persistence.*;

@Entity
public class Label {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int labelId;
    private String labelText;

    @ManyToOne( cascade = CascadeType.ALL)
    @JoinColumn(name = "taskId", referencedColumnName = "taskId")
    private Task task;
}
