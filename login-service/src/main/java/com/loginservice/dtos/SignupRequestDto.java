package com.loginservice.dtos;

public class SignupRequestDto {
    public final String username;
    public final String password;
    public final String fullName;

    public SignupRequestDto(String username, String password, String fullName) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
    }
}
