package com.example.demo.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class BookingRequest {
    
    @NotNull(message = "Listing ID is required")
    private Long listingId;
    
    @NotNull(message = "Check-in date is required")
    @Future(message = "Check-in date must be in the future")
    private LocalDate checkInDate;
    
    @NotNull(message = "Check-out date is required")
    @Future(message = "Check-out date must be in the future")
    private LocalDate checkOutDate;
    
    private Integer guests;
    
    // Constructors
    public BookingRequest() {}
    
    public BookingRequest(Long listingId, LocalDate checkInDate, LocalDate checkOutDate) {
        this.listingId = listingId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }
    
    public BookingRequest(Long listingId, LocalDate checkInDate, LocalDate checkOutDate, Integer guests) {
        this.listingId = listingId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.guests = guests;
    }
    
    // Getters and Setters
    public Long getListingId() {
        return listingId;
    }
    
    public void setListingId(Long listingId) {
        this.listingId = listingId;
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