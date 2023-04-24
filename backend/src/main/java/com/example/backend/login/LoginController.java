package com.example.backend.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {
    @PostMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody Login login) {
        System.out.println(login.getPassword() == "key123");
        if(login.getUsername().compareTo("seco@company.com") == 0 && login.getPassword().compareTo("key123") == 0) {
            return ResponseEntity.ok(true);
        }else{
            return ResponseEntity.ok(false);
        }
    }
}
