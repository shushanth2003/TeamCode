package com.example.backend.service;

import com.example.backend.Repository.ProfileRepo;
import com.example.backend.model.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Profileservice {
    @Autowired
    private ProfileRepo profileRepo;

    public String saveAllProfile(Profile profile) {
        if (
                profile.getFullname() == null || profile.getFullname().trim().isEmpty() ||
                        profile.getEmail() == null || profile.getEmail().trim().isEmpty() ||
                        profile.getPhoneno() == null || profile.getPhoneno().trim().isEmpty() ||
                        profile.getRole() == null || profile.getRole().trim().isEmpty() ||
                        profile.getGender() == null || profile.getGender().trim().isEmpty() ||
                        profile.getLocation() == null || profile.getLocation().trim().isEmpty() ||
                        profile.getWebsite() == null || profile.getWebsite().trim().isEmpty() ||
                        profile.getProfileurl() == null || profile.getProfileurl().trim().isEmpty() ||
                        profile.getAddress() == null || profile.getAddress().trim().isEmpty() ||
                        profile.getBio() == null || profile.getBio().trim().isEmpty()
        ) {
            return "Please fill all the fields";
        }
        profileRepo.save(profile);
        return "Data is saved Successfully";
    }

}
