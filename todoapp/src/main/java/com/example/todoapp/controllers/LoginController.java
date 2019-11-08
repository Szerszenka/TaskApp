package com.example.todoapp.controllers;

import com.example.todoapp.models.User;
import com.example.todoapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/login")
    public User validateUser(@RequestBody User user) {
        User userToValidate = userRepository.findByUsername(user.getUsername());
        if(userToValidate == null) {
            return new User("null", "null");
        }
        return userToValidate;
    }

}
