package com.hotelbooking.controller;

import com.hotelbooking.model.Hotel;
import com.hotelbooking.service.HotelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
@Tag(name = "Hotel Controller", description = "Endpoints for searching and viewing hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    @Operation(summary = "Get all hotels")
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/search")
    @Operation(summary = "Search hotels by location")
    public List<Hotel> searchHotels(@RequestParam String location) {
        return hotelService.searchHotels(location);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get hotel by ID")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        return ResponseEntity.ok(hotelService.getHotelById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new hotel (Admin only)")
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelService.createHotel(hotel);
    }
}
