package ru.mil.cop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class CopApplication {

    public static void main(String[] args) {
        SpringApplication.run(CopApplication.class, args);
    }

}
