package com.aleksandar.exercise.employeemanagement.demo.model.enumerations;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_MANAGER, ROLE_WORKER;

    @Override
    public String getAuthority() {
        return name();
    }
}
