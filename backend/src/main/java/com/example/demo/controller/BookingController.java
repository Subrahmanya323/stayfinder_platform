package com.example.demo.controller;

import com.example.demo.dto.BookingRequest;
import com.example.demo.entity.Booking;
import com.example.demo.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequest request, Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            Booking booking = bookingService.createBooking(request, userEmail);
            return ResponseEntity.status(HttpStatus.CREATED).body(booking);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<Booking>> getMyBookings(Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            List<Booking> bookings = bookingService.getBookingsByUser(userEmail);
            return ResponseEntity.ok(bookings);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<List<Booking>> getBookingsByListing(@PathVariable Long listingId) {
        try {
            List<Booking> bookings = bookingService.getBookingsByListing(listingId);
            return ResponseEntity.ok(bookings);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id, Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            bookingService.deleteBooking(id, userEmail);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 