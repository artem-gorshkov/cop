package ru.mil.cop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.mil.cop.dto.AuthenticationResponse;
import ru.mil.cop.dto.UserDto;
import ru.mil.cop.security.JwtProvider;
import ru.mil.cop.service.AuthService;

@RestController
@RequestMapping("/api")
public class AuthController {

    private AuthService authService;
    private JwtProvider jwtProvider;

    @Autowired
    public AuthController(AuthService authService, JwtProvider jwtProvider) {
        this.authService = authService;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/admin-auth")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody UserDto userDto, BindingResult bindingResult) {
        AuthenticationResponse response = authService.login(userDto);
        if (response.getAuthenticationToken() != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
    }

    @PostMapping("/token")
    public ResponseEntity<String> checkTokenValidity(@RequestHeader(name = "Authorization") String authorizationHeader) {
        if (authorizationHeader != null && jwtProvider.validateToken(authorizationHeader)) {
            return ResponseEntity.ok("Token valid");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid token");
        }
    }

    @PostMapping("/logout")
    public void logout() {
        SecurityContextHolder.getContext().setAuthentication(null);
    }
}