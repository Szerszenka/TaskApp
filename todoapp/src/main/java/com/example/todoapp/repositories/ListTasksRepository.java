package com.example.todoapp.repositories;

import com.example.todoapp.models.Task;
import com.example.todoapp.models.ListTasks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListTasksRepository extends MongoRepository<ListTasks, String> {

    @Query("{owner : ?0}")
    List<ListTasks> findListForUsername(String username);

    @Query("{name : ?0}")
    List<ListTasks> findByNameOfList(String listTaskName);
}
