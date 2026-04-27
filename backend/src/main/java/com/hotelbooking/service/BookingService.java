package com.hotelbooking.service;

import com.hotelbooking.model.Booking;
import com.hotelbooking.model.Room;
import com.hotelbooking.model.User;
import com.hotelbooking.repo.BookingRepository;
import com.hotelbooking.repo.RoomRepository;
import com.hotelbooking.repo.UserRepository;
import com.hotelbooking.exception.ResourceNotFoundException;
import com.hotelbooking.exception.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    public Booking createBooking(Long userId, Long roomId, Booking bookingRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        // Global maintenance check
        if (room.getAvailability() != null && !room.getAvailability()) {
            throw new ApiException("Room is currently under maintenance or unavailable");
        }

        // Date-based availability check
        List<Booking> overlaps = bookingRepository.findOverlappingBookings(
                roomId, bookingRequest.getCheckInDate(), bookingRequest.getCheckOutDate());
        
        if (!overlaps.isEmpty()) {
            throw new ApiException("Room is already booked for the selected dates");
        }

        bookingRequest.setUser(user);
        bookingRequest.setRoom(room);
        bookingRequest.setStatus("CONFIRMED");
        
        return bookingRepository.save(bookingRequest);
    }

    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
    }
}
