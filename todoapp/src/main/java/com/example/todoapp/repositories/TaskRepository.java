package com.example.todoapp.repositories;

import com.example.todoapp.models.Task;
import com.example.todoapp.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {

    @Query("{owner : ?0}")
    List<Task> findAllForUser(String username);

    Task findByTaskName(String taskName);
    Task deleteTaskByTaskName(String taskName);
}