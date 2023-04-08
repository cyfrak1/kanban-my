package com.example.backend.label;

import com.example.backend.task.Task;
import jakarta.persistence.*;

@Entity
public class Label {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String labelText;
    @Column(name = "task_id", insertable = false, updatable = false)
    private int taskId;
    @ManyToOne
    @JoinColumn(name = "task_id", referencedColumnName = "taskId")
    private Task task;

    public int getId() {
        return id;
    }

    public String getLabelText() {
        return labelText;
    }

    public int getTaskId() {
        return taskId;
    }
    public void setTask(Task task) {
        this.task = task;
    }

    public void setLabelText(String labelText) {
        this.labelText = labelText;
    }
}
