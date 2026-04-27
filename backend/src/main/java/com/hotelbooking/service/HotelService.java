package com.hotelbooking.service;

import com.hotelbooking.model.Hotel;
import com.hotelbooking.model.Room;
import com.hotelbooking.repo.HotelRepository;
import com.hotelbooking.repo.RoomRepository;
import com.hotelbooking.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public List<Hotel> searchHotels(String location) {
        return hotelRepository.findByLocationContainingIgnoreCase(location);
    }

    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + id));
    }

    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public Room addRoomToHotel(Long hotelId, Room room) {
        Hotel hotel = getHotelById(hotelId);
        room.setHotel(hotel);
        return roomRepository.save(room);
    }
}
