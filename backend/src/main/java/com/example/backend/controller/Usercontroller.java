package com.example.backend.controller;

import com.example.backend.Repository.Userrepo;
import com.example.backend.dto.Loginrequest;
import com.example.backend.model.Contact;
import com.example.backend.model.User;
import com.example.backend.service.Userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5174")
@RestController
@RequestMapping("/api")
public class Usercontroller {
    @Autowired
    private Userservice userservice;
    @Autowired
    private Userrepo userrepo;
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user){
        String res=userservice.getRegister(user);
        if(res.equals("User Registered SuccessFully")){
            return ResponseEntity.ok(res);
        }else{
            return ResponseEntity.badRequest().body(res);
        }
    }
    @PostMapping("/contact")
    public ResponseEntity<String> contactUser(@RequestBody Contact contact){
        String res=userservice.getContacts(contact);
        if(res.equals("Contacts Saved SuccessFully")){
            return ResponseEntity.ok(res);
        }else{
            return ResponseEntity.badRequest().body(res);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Loginrequest loginrequest){
        boolean success=userservice.login(loginrequest.getEmail(),loginrequest.getPassword());
        if(success){
            return ResponseEntity.ok("Login SuccessFully");
        }else{
            return ResponseEntity.status(401).body("Invalid Login Credientals");
        }
    }
    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userrepo.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
