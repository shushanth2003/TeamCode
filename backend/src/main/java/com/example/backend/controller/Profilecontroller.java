package com.example.backend.controller;

import com.example.backend.model.Profile;
import com.example.backend.service.Profileservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class Profilecontroller {
    @Autowired
    private Profileservice profileService;

    @PostMapping("/profile")
    public ResponseEntity<String> saveProfile(@RequestBody Profile profile) {
        String result = profileService.saveAllProfile(profile);

        if (result.equals("Please fill all the fields")) {
            return ResponseEntity.badRequest().body(result); // HTTP 400 if any field is missing
        }
        return ResponseEntity.ok(result); // HTTP 200 if saved successfully
    }
}
