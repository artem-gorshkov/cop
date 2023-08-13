package ru.mil.cop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mil.cop.dto.AuthenticationResponse;
import ru.mil.cop.dto.UserDto;
import ru.mil.cop.service.AuthService;

@RestController
@RequestMapping("/api")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/admin-auth")
    public AuthenticationResponse login(@RequestBody UserDto userDto, BindingResult bindingResult) {
        return authService.login(userDto);
    }

}
