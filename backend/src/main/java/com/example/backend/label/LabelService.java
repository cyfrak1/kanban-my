package com.example.backend.label;

import java.util.List;

public interface LabelService {
    public void addLabel(Label label);
    public void delteLabel(Integer labelId);
    public void updateLabel(Integer labelId, String labelName);
    public List<Label> getAllLabels(Integer taskId);
}
