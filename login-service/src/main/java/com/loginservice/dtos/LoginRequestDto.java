package com.loginservice.dtos;

public class LoginRequestDto {
    public final String username;
    public final String password;

    public LoginRequestDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
