package com.example.demo.service;

import com.example.demo.dto.BookingRequest;
import com.example.demo.entity.Booking;
import com.example.demo.entity.Listing;
import com.example.demo.entity.User;
import com.example.demo.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ListingService listingService;

    @Autowired
    private UserService userService;

    public Booking createBooking(BookingRequest request, String userEmail) {
        // Validate dates
        if (request.getCheckInDate().isAfter(request.getCheckOutDate())) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }

        if (request.getCheckInDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Check-in date must be in the future");
        }

        // Get listing and user
        Listing listing = listingService.getListingById(request.getListingId());
        User user = userService.getUserByEmail(userEmail);

        // Check availability
        List<Booking> overlappingBookings = bookingRepository.findOverlappingBookings(
                request.getListingId(), request.getCheckInDate(), request.getCheckOutDate());

        if (!overlappingBookings.isEmpty()) {
            throw new RuntimeException("The selected dates are already booked for this property.");
        }


        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setListing(listing);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setGuests(request.getGuests());

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUser(String userEmail) {
        User user = userService.getUserByEmail(userEmail);
        return bookingRepository.findByUser(user);
    }

    public List<Booking> getBookingsByListing(Long listingId) {
        Listing listing = listingService.getListingById(listingId);
        return bookingRepository.findByListing(listing);
    }

    public void deleteBooking(Long bookingId, String userEmail) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        User user = userService.getUserByEmail(userEmail);

        // Check if user is the owner of the booking
        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You can only delete your own bookings");
        }

        bookingRepository.delete(booking);
    }
} 