package com.loginservice.dtos;

public class SignupRequestDto {
    public final String username;
    public final String password;

    public SignupRequestDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
