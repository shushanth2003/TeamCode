package com.example.backend.Repository;

import com.example.backend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Long> {
    boolean existsByFullnameAndEmail(String fullname, String email);
}
