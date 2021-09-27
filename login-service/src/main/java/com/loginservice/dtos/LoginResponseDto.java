package com.loginservice.dtos;

public class LoginResponseDto {
    private final String token;
    private final String id;
    private final String username;


    public LoginResponseDto(String token, String id, String username) {
        this.token = token;
        this.id = id;
        this.username = username;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }
}
