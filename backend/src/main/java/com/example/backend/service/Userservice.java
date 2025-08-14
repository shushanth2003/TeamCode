package com.example.backend.service;

import com.example.backend.Repository.ContactRepo;
import com.example.backend.Repository.Userrepo;
import com.example.backend.model.Contact;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Userservice {
    @Autowired
    private Userrepo userrepo;
    @Autowired
    private ContactRepo contactRepo;
    public String getRegister(User user) {
        if(userrepo.existsByEmail(user.getEmail())){
            return "Email is Already Registered SuccessFully";
        }
        userrepo.save(user);
        return "User Registered SuccessFully";
    }
    public String getContacts(Contact contact){
        if(contactRepo.existsByFullnameAndEmail(contact.getFullname(), contact.getEmail())){
            return "User is Already send the Message to Us";
        }
        contactRepo.save(contact);
        return "Contacts Saved SuccessFully";
    }
    public boolean login(String email, String password) {
        User user=userrepo.findByEmail(email);
        if(user!=null && user.getPassword().equals(password)){
            return true;
        }
        return false;
    }
}
