package com.example.todoapp;

import com.example.todoapp.models.ListTasks;
import com.example.todoapp.models.Task;
import com.example.todoapp.models.User;
import com.example.todoapp.repositories.ListTasksRepository;
import com.example.todoapp.repositories.TaskRepository;
import com.example.todoapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class TodoappApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ListTasksRepository listTasksRepository;

    public static void main(String[] args) {
        SpringApplication.run(TodoappApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

      // userRepository.save(new User("Meh", "xyz"));
      // userRepository.save(new User("Not", "hehe"));

        List<Task> list = new ArrayList<Task>();

        System.out.println("Customers found with findAll():");
        System.out.println("-------------------------------");
        for (User user : userRepository.findAll()) {
            System.out.println(user);
        }
        System.out.println();
        System.out.println("Tasks found with findAll():");
        System.out.println("-------------------------------");
        for (Task task : taskRepository.findAllForUser("szerszen") ){
            System.out.println(task);
            list.add(task);
        }
        /*listTasksRepository.save(new ListTasks(
                "Lista 101", "szerszen", list
        ));*/
    }
}
