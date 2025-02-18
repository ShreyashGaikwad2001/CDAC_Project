# CDAC_Project
project made for finals submission under the cdac course at sunbeam pune

# Overview
Parkngo is a online parkning service that allows users to search nearby parking lots and book a parking.
The project employs industry approved technologies like Spring boot, Nodejs, MySql and ReactJs and REST standards in the backend apis.
We also integrated the google maps api in the forntend to have dynamic search functionality.
The project frontend is deployed to vercel and all the services are dockerized and registered to docker-hub.
Documentation for individal services is available in their own folders.

## Table of Contents
- [Backend Architecture](#backend-architecture)
- [Database Implementation](#database-implementation)
- [Front-End SPA Design](#front-end-spa-design)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Contributing](#contributors)

## Contributors

|Contributer | Github | linkedin |
|---------|---------|---------|
| Kartik Patil | [KartikPDev](https://github.com/KartikPDev) | [kartik-patil](https://www.linkedin.com/in/kartik-patil-b39917204/) |
| Manish Patil | [manishelf](https://github.com/manishelf/) |  [manish-patil-mpm](https://www.linkedin.com/in/manish-patil-mpm) |
| Manish Gupta | [manishguptaaa](https://github.com/manishguptaaa) |  [manishgupta2000](https://www.linkedin.com/in/manishgupta2000) |
| Shreyash Gaikwad | [ShreyashGaikwad2001](https://github.com/ShreyashGaikwad2001) |  [shreyash-shrikant-gaikwad](https://www.linkedin.com/in/shreyash-shrikant-gaikwad) |

>planner-
>[manishelf/projects/1/](https://github.com/users/manishelf/projects/1/)

# Documentaion 
branch wise documentation is available in README of each branch

# Deployment
this project is docker ready and registered on docker hub
* [manishelf/cdac-project-main-frontend-react](https://hub.docker.com/repository/docker/manishelf/cdac-project-main-frontend-react)
*  [manishelf/cdac-project-main-node-app/general](https://hub.docker.com/repository/docker/manishelf/cdac-project-main-node-app/)
*  [manishelf/cdac-project-main-spring-boot-app/general](https://hub.docker.com/repository/docker/manishelf/cdac-project-main-spring-boot-app/)
*  [manishelf/cdac-project-main-node-app/general](https://hub.docker.com/repository/docker/manishelf/cdac-project-main-node-app/general)

check it out at https://cdac-project-parkngo.vercel.app/

## Backend Architecture

Our backend architecture employs a microservices approach, leveraging Spring Boot, Node.js, and MySQL. The core user flow and CRUD operations are managed by the Spring Boot application, while the mailing service is handled by a separate Node.js service.

- **Spring Boot Application:** Manages business logic and core CRUD operations.
- **Node.js Mailing Service:** Handles email communication asynchronously using template-based mailing and JWT authentication for secure communication.

### Key Features
- Separation of concerns for better code organization and maintainability.
- Asynchronous communication between services to enhance responsiveness.
- Utilization of Node.js for its multi-connection architecture and automatic mailing queue.

## Database Implementation

We utilized MySQL as our Relational Database Management System (RDBMS) for this project. The database schema is pre-created using an `init.sql` file, which simplifies the insertion of sample data.

### Key Features
- ER Diagram: Visual representation of the database schema.
- Docker Integration: Automatically creates necessary tables during container creation.
- Hibernate ORM: Used in the Spring Boot application for database operations.

## Front-End SPA Design

The front-end of the application is a Single Page Application (SPA) built with ReactJS and managed with the yarn package manager. It handles both user and admin flows with various functionalities.

### User Flow
- **Login:** Secure user authentication.
- **Registration:** New user account creation.
- **Booking Search:** Search for available bookings based on location.
- **Booking Details:** View details of a specific booking.
- **Booking Confirmation:** Confirm a booking.
- **Booking Receipt:** Generate a printable receipt for a confirmed booking.

### Admin Flow
- **System and Status View:** Monitor system health and status.
- **Service Analytics View:** Display analytics such as registered users and available lots.
- **User Ban:** Ability to ban users from the service.

### Technologies and Implementation
- **Client-Server Communication:** Axios for HTTP requests.
- **JWT Handling:** JSON Web Token for authentication, stored in session storage.
- **Search Functionality:** Includes exact location search, general wide-range search, and Google Maps integration.

## Technologies Used
- **Backend:** Spring Boot, Node.js, Express.js, MySQL, Hibernate
- **Frontend:** ReactJS, Axios, JWT, Google Maps API
- **Database:** MySQL
- **Containerization:** Docker

## Setup and Installation

### Prerequisites
- Docker
  This project is docker deployed
### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/manishelf/CDAC_Project.git
   ```
2. Navigate to the project directory and start by 
   ```bash
   cd CDAC_Project
   ```
   ```bash
   docker-compose up
   ```
