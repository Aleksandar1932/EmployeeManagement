package com.aleksandar.exercise.employeemanagement.demo.model.dto;

import com.aleksandar.exercise.employeemanagement.demo.model.enumerations.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    private String username;

    private String password;

    private String repeatPassword;

    private Role role;

    public UserDto(String username, String password, String repeatPassword, Role role) {
        this.username = username;
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.role = role;
    }
}
