package com.example.demo.controller;

import com.example.demo.entity.Listing;
import com.example.demo.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @GetMapping
    public ResponseEntity<List<Listing>> getAllListings() {
        List<Listing> listings = listingService.getAllListings();
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Listing> getListingById(@PathVariable Long id) {
        try {
            Listing listing = listingService.getListingById(id);
            return ResponseEntity.ok(listing);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
} 