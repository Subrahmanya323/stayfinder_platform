package com.example.demo.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "listings")
public class Listing {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    
    @Column(nullable = false)
    private String location;
    
    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;
    
    @Column(columnDefinition = "TEXT")
    private String images; // Comma-separated image URLs
    
    @Column(columnDefinition = "TEXT")
    private String amenities; // Comma-separated amenities
    
    // Additional fields for better property details
    private Integer bedrooms;
    private Integer bathrooms;
    private Integer maxGuests;
    
    // Constructors
    public Listing() {}
    
    public Listing(String title, String description, String location, BigDecimal price) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.price = price;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getImages() {
        return images;
    }
    
    public void setImages(String images) {
        this.images = images;
    }
    
    public Integer getBedrooms() {
        return bedrooms;
    }
    
    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }
    
    public Integer getBathrooms() {
        return bathrooms;
    }
    
    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }
    
    public Integer getMaxGuests() {
        return maxGuests;
    }
    
    public void setMaxGuests(Integer maxGuests) {
        this.maxGuests = maxGuests;
    }
    
    public String getAmenities() {
        return amenities;
    }
    
    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }
} 