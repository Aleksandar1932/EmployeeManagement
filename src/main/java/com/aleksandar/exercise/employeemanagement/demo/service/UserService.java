package com.aleksandar.exercise.employeemanagement.demo.service;

import com.aleksandar.exercise.employeemanagement.demo.model.User;
import com.aleksandar.exercise.employeemanagement.demo.model.dto.UserDto;
import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User register(UserDto userDto);
}
