package com.example.todoapp.controllers;

import com.example.todoapp.models.ListTasks;
import com.example.todoapp.models.Task;
import com.example.todoapp.models.User;
import com.example.todoapp.repositories.ListTasksRepository;
import com.example.todoapp.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    ListTasksRepository listTasksRepository;

    @GetMapping("/tasks/all")
    public List<Task> tasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/tasks/add")
    public ListTasks createList(@RequestParam("name") String name, @RequestParam("owner") String owner) {
        ListTasks newList = new ListTasks(name, owner);
        return listTasksRepository.save(newList);
    }

    @GetMapping("/tasks/addTask")
    public Task createTask(@RequestParam("taskName") String taskName, @RequestParam("owner") String owner,
                           @RequestParam("taskDesc") String taskDesc, @RequestParam("listName") String listName) {
        Task newTask = new Task(taskName, taskDesc, owner);
        List<ListTasks> requested = listTasksRepository.findByNameOfList(listName);
        List<Task> response;
        if (requested.isEmpty()) {
            response =  new ArrayList<Task>();
        } else {
            response = requested.get(0).getListTasks();
            response.add(newTask);
            listTasksRepository.save(requested.get(0));
        }
        return taskRepository.save(newTask);
    }

    @GetMapping("/tasks/taskDone")
    public Task taskDone(@RequestParam("taskName") String taskName, @RequestParam("listName") String listName) {
        ListTasks list = listTasksRepository.findByNameOfList(listName).get(0);
        Task requested = taskRepository.findByTaskName(taskName);
        for(Task task : list.getListTasks()) {
            if(task.getTaskName().equals(taskName)) {
                task.setDone(true);
                listTasksRepository.save(list);
                break;
            }
        }
        requested.setDone(true);
        return taskRepository.save(requested);
    }

    @DeleteMapping(value="/tasks/{taskName}")
    public void deleteTask(@PathVariable("taskName") String taskName) {
        Task requested = taskRepository.findByTaskName(taskName);
        taskRepository.delete(requested);
    }

    @GetMapping("/tasks/{listTaskName}")
    public List<Task> getListTaskByName(@PathVariable("listTaskName") String listTaskName) {
        List<ListTasks> requested = listTasksRepository.findByNameOfList(listTaskName);
        List<Task> response;
        if (requested.isEmpty()) {
            response =  new ArrayList<Task>();
        } else {
            response = requested.get(0).getListTasks();
        }
        return response;
    }

    @PostMapping("/tasks")
    public List<ListTasks> findListForUsername(@RequestBody String username) {
        return listTasksRepository.findListForUsername(username);
    }


    @PutMapping(value="/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable("id") String id,
                                           @Valid @RequestBody Task task) {
        return taskRepository.findById(id)
                .map(taskData -> {
                    taskData.setTaskName(task.getTaskName());
                    taskData.setTaskDesc(task.getTaskDesc());
                    Task updatedTask = taskRepository.save(taskData);
                    return ResponseEntity.ok().body(updatedTask);
                }).orElse(ResponseEntity.notFound().build());
    }

}