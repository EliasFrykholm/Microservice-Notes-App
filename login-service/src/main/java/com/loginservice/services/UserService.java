package com.loginservice.services;

import com.loginservice.models.User;
import com.loginservice.repository.mongodb.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.rmi.AlreadyBoundException;

@Service
public class UserService {
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    UserRepository userRepository;

    public void signUp(String fullName, String username, String password) throws AlreadyBoundException {
        if (userRepository.existsByUsername(username)) {
            throw new AlreadyBoundException();
        }
        User user = new User(fullName, username, encoder.encode(password));

        userRepository.save(user);
    }
}
