package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;
    
    @Column(nullable = false)
    private LocalDate checkInDate;
    
    @Column(nullable = false)
    private LocalDate checkOutDate;
    
    private Integer guests;
    
    // Constructors
    public Booking() {}
    
    public Booking(User user, Listing listing, LocalDate checkInDate, LocalDate checkOutDate) {
        this.user = user;
        this.listing = listing;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }
    
    public Booking(User user, Listing listing, LocalDate checkInDate, LocalDate checkOutDate, Integer guests) {
        this.user = user;
        this.listing = listing;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.guests = guests;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Listing getListing() {
        return listing;
    }
    
    public void setListing(Listing listing) {
        this.listing = listing;
    }
    
    public LocalDate getCheckInDate() {
        return checkInDate;
    }
    
    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }
    
    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }
    
    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }
    
    public Integer getGuests() {
        return guests;
    }
    
    public void setGuests(Integer guests) {
        this.guests = guests;
    }
} 