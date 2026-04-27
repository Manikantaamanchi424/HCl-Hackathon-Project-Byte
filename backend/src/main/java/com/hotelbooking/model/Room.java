package com.hotelbooking.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @Column(nullable = false)
    private String type; // e.g., SINGLE, DOUBLE, SUITE

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Boolean availability;

    public Room() {}

    public Room(Long id, Hotel hotel, String type, Double price, Boolean availability) {
        this.id = id;
        this.hotel = hotel;
        this.type = type;
        this.price = price;
        this.availability = availability;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Hotel getHotel() { return hotel; }
    public void setHotel(Hotel hotel) { this.hotel = hotel; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Boolean getAvailability() { return availability; }
    public void setAvailability(Boolean availability) { this.availability = availability; }
}
