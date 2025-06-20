package com.example.demo.dto;

public class AuthResponse {
    
    private String token;
    private Long id;
    private String email;
    private String name;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String token, Long id, String email, String name) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.name = name;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
} 