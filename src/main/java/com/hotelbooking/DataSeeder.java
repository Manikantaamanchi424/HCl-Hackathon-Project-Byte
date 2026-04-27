package com.hotelbooking;

import com.hotelbooking.model.Hotel;
import com.hotelbooking.model.Room;
import com.hotelbooking.model.User;
import com.hotelbooking.repo.HotelRepository;
import com.hotelbooking.repo.RoomRepository;
import com.hotelbooking.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Seed Admin
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@hotel.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);

            // Seed User
            User user = new User();
            user.setName("John Doe");
            user.setEmail("john@example.com");
            user.setPassword(passwordEncoder.encode("password123"));
            user.setRole("ROLE_USER");
            userRepository.save(user);

            // Seed Hotels
            Hotel h1 = new Hotel();
            h1.setName("Grand Palace");
            h1.setLocation("New York");
            h1.setDescription("Luxury hotel in the heart of NYC");
            h1.setAmenities("Pool, Gym, WiFi, Breakfast");
            hotelRepository.save(h1);

            Hotel h2 = new Hotel();
            h2.setName("Sea Breeze Resort");
            h2.setLocation("Miami");
            h2.setDescription("Beautiful beachfront resort");
            h2.setAmenities("Beach Access, Bar, Spa");
            hotelRepository.save(h2);

            // Seed Rooms
            Room r1 = new Room();
            r1.setHotel(h1);
            r1.setType("DELUXE");
            r1.setPrice(250.0);
            r1.setAvailability(true);
            roomRepository.save(r1);

            Room r2 = new Room();
            r2.setHotel(h1);
            r2.setType("SUITE");
            r2.setPrice(450.0);
            r2.setAvailability(true);
            roomRepository.save(r2);

            Room r3 = new Room();
            r3.setHotel(h2);
            r3.setType("OCEAN VIEW");
            r3.setPrice(350.0);
            r3.setAvailability(true);
            roomRepository.save(r3);
            
            System.out.println("Database seeded successfully!");
        }
    }
}
