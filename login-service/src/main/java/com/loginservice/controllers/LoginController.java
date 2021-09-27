package com.loginservice.controllers;

import com.loginservice.dtos.LoginRequestDto;
import com.loginservice.dtos.LoginResponseDto;
import com.loginservice.dtos.SignupRequestDto;

import com.loginservice.security.MyUserDetails;
import com.loginservice.security.jwt.JwtUtils;
import com.loginservice.services.SignupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.rmi.AlreadyBoundException;

@RestController
public class LoginController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private SignupService signupService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping(value = "/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<LoginResponseDto> getMethodName(@RequestBody LoginRequestDto request, HttpServletResponse response)
            throws UnsupportedEncodingException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username, request.password));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        Cookie cookie = new Cookie("token", jwt);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new LoginResponseDto(userDetails.getId(), userDetails.getUsername()));
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<String> getMethodName(@RequestBody SignupRequestDto request) {
        try {
            signupService.signUp(request.fullName, request.username, request.password);
            return ResponseEntity.ok().build();
        } catch (AlreadyBoundException e) {
            return ResponseEntity.badRequest().build();
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
