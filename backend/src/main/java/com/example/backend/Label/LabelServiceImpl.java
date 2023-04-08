package com.example.backend.Label;

import com.example.backend.Task.Task;
import com.example.backend.Task.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class LabelServiceImpl implements LabelService{
    @Autowired
    private LabelRepo labelRepo;
    @Autowired
    private TaskRepo taskRepo;
    @Override
    public void addLabel(Label label) {
        Task task = taskRepo.findById(label.getTaskId()).get();
        label.setTask(task);
        labelRepo.save(label);
    }

    @Override
    public void delteLabel(Integer labelId) {
        labelRepo.deleteById(labelId);
    }

    @Override
    public void updateLabel(Integer labelId, String labelName) {
        Label label = labelRepo.findById(labelId).get();
        label.setLabelText(labelName);
        labelRepo.save(label);
    }

    @Override
    public List<Label> getAllLabels(Integer taskId) {
        List<Label> labels = new ArrayList<>();
        labels.addAll(taskRepo.findById(taskId).get().getLabels());
        return labels;
    }
}
