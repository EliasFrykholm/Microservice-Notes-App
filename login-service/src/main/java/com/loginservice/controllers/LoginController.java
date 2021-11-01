package com.loginservice.controllers;

import com.loginservice.dtos.LoginRequestDto;
import com.loginservice.dtos.TokenResponseDto;
import com.loginservice.dtos.SignupRequestDto;

import com.loginservice.security.jwt.JwtUtils;
import com.loginservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.rmi.AlreadyBoundException;

@RestController
public class LoginController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping(value = "/login")
    public ResponseEntity<TokenResponseDto> getMethodName(@RequestBody LoginRequestDto request)
            throws UnsupportedEncodingException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username, request.password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        return ResponseEntity.ok(new TokenResponseDto(jwt));
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<String> getMethodName(@RequestBody SignupRequestDto request) {
        try {
            userService.signUp(request.fullName, request.username, request.password);
            return ResponseEntity.ok().build();
        } catch (AlreadyBoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/validate")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> validateToken() {
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/refresh")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<TokenResponseDto> refreshToken(Authentication authentication) {
        try {
            String token = jwtUtils.generateJwtToken(authentication);
            return ResponseEntity.ok(new TokenResponseDto(token));
        } catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/test")
    @PreAuthorize("hasRole('USER')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/")
    public String loggedIn(){
        return("<h1>Welcome user</h1>");
    }
}
