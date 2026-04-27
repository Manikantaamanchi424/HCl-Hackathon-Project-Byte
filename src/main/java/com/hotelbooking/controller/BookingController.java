package com.hotelbooking.controller;

import com.hotelbooking.model.Booking;
import com.hotelbooking.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
@Tag(name = "Booking Controller", description = "Endpoints for room bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/user/{userId}/room/{roomId}")
    @Operation(summary = "Create a new booking")
    public ResponseEntity<Booking> createBooking(
            @PathVariable Long userId,
            @PathVariable Long roomId,
            @RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(userId, roomId, booking));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get all bookings for a user")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancel a booking")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.noContent().build();
    }
}
