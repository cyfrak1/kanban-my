package com.example.backend.Label;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepo extends JpaRepository<Label,Integer> {
}
