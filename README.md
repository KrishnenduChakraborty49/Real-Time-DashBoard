# Enterprise GIS Flood Monitoring Dashboard

A production-quality, real-time flood monitoring dashboard and disaster management system built for government and enterprise use. 

## Features
- **Real-Time GIS Mapping**: Leaflet integration with dynamic status markers.
- **Advanced Analytics**: Recharts for visualizing water trends and historical data.
- **Enterprise Security**: Spring Security with JWT token-based authentication.
- **Modern UI/UX**: Glassmorphism aesthetic with TailwindCSS.
- **Docker Ready**: Complete containerization for the full stack (PostgreSQL, Spring Boot Backend, Vite Frontend).

## Architecture
- **Frontend**: React 19, TypeScript, Vite, TailwindCSS, React Router, Recharts, React-Leaflet
- **Backend**: Spring Boot 3, Java 21, Spring Data JPA, Spring Security, JWT, Lombok
- **Database**: PostgreSQL 15

## Quick Start (Docker)
To run the entire stack via Docker:

```bash
docker-compose up --build
```
- Frontend will be available at `http://localhost:3000`
- Backend API will be available at `http://localhost:8080`

## Manual Development Setup

### Backend (Spring Boot)
1. Navigate to `./backend`
2. Ensure you have a running PostgreSQL database named `flood_db` (or modify `application.yml`).
3. Run `./mvnw spring-boot:run`

### Frontend (React/Vite)
1. Navigate to `./frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
