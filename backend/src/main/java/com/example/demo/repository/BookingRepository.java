package com.example.demo.repository;

import com.example.demo.entity.Booking;
import com.example.demo.entity.Listing;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUser(User user);
    
    List<Booking> findByListing(Listing listing);
    
    // Custom query to check for overlapping bookings
    @Query("SELECT b FROM Booking b WHERE b.listing.id = :listingId AND " +
           "((b.checkInDate <= :checkInDate AND b.checkOutDate > :checkInDate) OR " +
           "(b.checkInDate < :checkOutDate AND b.checkOutDate >= :checkOutDate) OR " +
           "(b.checkInDate >= :checkInDate AND b.checkOutDate <= :checkOutDate))")
    List<Booking> findOverlappingBookings(@Param("listingId") Long listingId,
                                         @Param("checkInDate") LocalDate checkInDate,
                                         @Param("checkOutDate") LocalDate checkOutDate);
} 