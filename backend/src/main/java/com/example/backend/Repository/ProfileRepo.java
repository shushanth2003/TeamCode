package com.example.backend.Repository;

import com.example.backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepo extends JpaRepository<Profile,Long> {
    Profile findByemail(String email);
}
