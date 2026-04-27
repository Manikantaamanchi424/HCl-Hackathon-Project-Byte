package com.hotelbooking.repo;

import com.hotelbooking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);

    @org.springframework.data.jpa.repository.Query("SELECT b FROM Booking b WHERE b.room.id = :roomId AND b.status != 'CANCELLED' AND " +
           "(:checkIn < b.checkOutDate AND :checkOut > b.checkInDate)")
    List<Booking> findOverlappingBookings(
            @org.springframework.data.repository.query.Param("roomId") Long roomId, 
            @org.springframework.data.repository.query.Param("checkIn") java.time.LocalDate checkIn, 
            @org.springframework.data.repository.query.Param("checkOut") java.time.LocalDate checkOut);
}
