# StayFinder 🏡

A full-stack property booking platform built with **React** (frontend) and **Spring Boot** (backend), designed to allow users to browse, view, and book short-term rental properties. Inspired by platforms like Airbnb, StayFinder provides a minimal but functional MVP for property search and reservation.

---

---

## ✅ Features

- 🔐 User registration and login with JWT authentication
- 🏘️ Browse available property listings
- 🗺️ View detailed listing information including images and description
- 📅 Book properties by selecting check-in and check-out dates
- 📂 View all your confirmed bookings
- 📱 Responsive UI with clean user experience

---

## 🧰 Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Axios
- React Router DOM

**Backend:**
- Spring Boot
- Spring Security
- JWT for authentication
- JPA/Hibernate
- RESTful APIs

**Database:**
- MySQL

---

## 🚀 Getting Started

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend

   
Configure MySQL in src/main/resources/application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/stayfinder
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
 
Run the backend server:
``bash
./mvnw spring-boot:run


### Frontend setup

2. **Navigate to the frontend directory:**
   ``bash 
    cd frontend
    npm install
    npm start



