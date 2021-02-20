package com.aleksandar.exercise.employeemanagement.demo.service.impl;

import com.aleksandar.exercise.employeemanagement.demo.model.User;
import com.aleksandar.exercise.employeemanagement.demo.model.dto.UserDto;
import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.Role;
import com.aleksandar.exercise.employeemanagement.demo.model.exceptions.InvalidUsernameOrPasswordException;
import com.aleksandar.exercise.employeemanagement.demo.model.exceptions.PasswordsDoNotMatchException;
import com.aleksandar.exercise.employeemanagement.demo.model.exceptions.UsernameExistsException;
import com.aleksandar.exercise.employeemanagement.demo.repository.jpa.UserRepository;
import com.aleksandar.exercise.employeemanagement.demo.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(UserDto userDto) {
        if (userDto.getUsername() == null || userDto.getUsername().isEmpty() || userDto.getPassword() == null || userDto.getPassword().isEmpty()) {
            throw new InvalidUsernameOrPasswordException();
        }

        if (!userDto.getPassword().equals(userDto.getRepeatPassword())) {
            throw new PasswordsDoNotMatchException();
        }

        if (this.userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new UsernameExistsException(userDto.getUsername());
        }

        User user = new User(userDto.getUsername(), passwordEncoder.encode(userDto.getPassword()), userDto.getRole());
        return this.userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(s).orElseThrow(() -> new UsernameNotFoundException(s));
    }

    @Override
    public Long getWorkersCount() {
        return this.userRepository.countAllByRole(Role.ROLE_WORKER);
    }
}
