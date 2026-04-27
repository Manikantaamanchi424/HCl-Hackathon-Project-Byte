# Hotel Booking Application Backend

A robust RESTful API built with Spring Boot for managing hotel searches and room bookings.

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Maven 3.6+**
- **MySQL 8.0+**

### 🛠️ Setup Instructions

#### 1. Database Configuration
Ensure MySQL is running and the credentials match the following in `src/main/resources/application.properties`:
- **URL**: `jdbc:mysql://localhost:3306/hotel_booking_db`
- **Username**: `root`
- **Password**: `0000`

#### 2. Run the Application
Open your terminal in the root folder and run:
```bash
mvn spring-boot:run
```

The application will start on **http://localhost:8080**.

### 📖 API Documentation (Swagger)
Once the app is running, explore the APIs here:
👉 [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

### 🧪 Test Data
The application automatically seeds the database with:
- **Admin**: `admin@hotel.com` / `admin123`
- **User**: `john@example.com` / `password123`
- **Hotels**: Grand Palace (New York), Sea Breeze Resort (Miami).

## 🏗️ Project Structure
- `com.hotelbooking.model`: JPA Entities
- `com.hotelbooking.repo`: Spring Data JPA Repositories
- `com.hotelbooking.service`: Business Logic Layer
- `com.hotelbooking.controller`: REST Controllers
- `com.hotelbooking.exception`: Global Exception Handling
- `com.hotelbooking.security`: JWT & Security Configuration

## 🔒 Security
- **Authentication**: JWT (Stateless)
- **CORS**: Enabled for all origins (`*`)
- **Authorization**: Role-based (ROLE_USER, ROLE_ADMIN)
