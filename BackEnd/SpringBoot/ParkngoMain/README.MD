## ParkngoMain (Spring Boot Backend)

 Spring Boot backend service for the Parkngo project.  It handles the core user flow, CRUD operations, and interacts with the Node.js mailing service.

## Technologies Used

- Java 17
- Spring Boot 3.2
- JPA (Java Persistence API)
- MySQL
- Swagger for API documentation
- Spring Security
- JWT (JSON Web Token) for authentication


## Endpoints

# Parkngo API Endpoints

This document lists the API endpoints for the Parkngo application, along with a brief description of each.

## Admin Endpoints

* **`PUT /admin/update-status/{userId}`**: Update a user's status.
* **`GET /admin/users-list`**: Get a list of all users.
* **`GET /admin/uptime`**: Get the server uptime.
* **`GET /admin/serviceMetrics`**: Get service metrics.
* **`GET /admin/mailingServiceStatus`**: Get the status of the mailing service.
* **`GET /admin/dbstatus`**: Get the database status.

## User Endpoints

* **`POST /user/register`**: Register a new user.
* **`POST /user/otp`**: Generate an email OTP.
* **`POST /user/login`**: Authenticate a user.

## Parking Endpoints

* **`POST /parking/search`**: Search for parking lots.
* **`POST /parking/book`**: Book a parking lot.
* **`GET /parking/booking/{id}`**: Get details of a specific booking.


# Parkngo API Documentation

This document describes the REST API for the Parkngo application.  The API is defined using OpenAPI 3.0.1

## API Endpoints

### Admin Controller

* **`PUT /admin/update-status/{userId}`**
    * **Operation ID:** `updateUserStatus`
    * **Description:** Updates the status of a user.
    * **Parameters:**
        * `userId` (path, required, integer, int64): The ID of the user to update.
    * **Responses:**
        * `200 OK`: Success.

* **`GET /admin/users-list`**
    * **Operation ID:** `getUserDetails`
    * **Description:** Retrieves a list of users.
    * **Responses:**
        * `200 OK`: Success.

* **`GET /admin/uptime`**
    * **Operation ID:** `getUptime`
    * **Description:** Retrieves the uptime of the service.
    * **Responses:**
        * `200 OK`: Success (returns uptime as a string).

* **`GET /admin/serviceMetrics`**
    * **Operation ID:** `getServiceMetrics`
    * **Description:** Retrieves service metrics.
    * **Responses:**
        * `200 OK`: Success.

* **`GET /admin/mailingServiceStatus`**
    * **Operation ID:** `getMailingServiceStatus`
    * **Description:** Retrieves the status of the mailing service.
    * **Responses:**
        * `200 OK`: Success (returns status as a string).

* **`GET /admin/dbstatus`**
    * **Operation ID:** `getDbStatus`
    * **Description:** Retrieves the database status.
    * **Responses:**
        * `200 OK`: Success (returns status as a string).


### User Controller

* **`POST /user/register`**
    * **Operation ID:** `userRegistration`
    * **Description:** Registers a new user.
    * **Request Body:**
        * `UserRegistrationDto` (required, application/json): User registration details.  See [Schemas](#schemas) for details.
    * **Responses:**
        * `200 OK`: Success.

* **`POST /user/otp`**
    * **Operation ID:** `generateEmailOtp`
    * **Description:** Generates an email OTP.
    * **Parameters:**
        * `email` (query, required, string): The email address for OTP generation.
    * **Responses:**
        * `200 OK`: Success.

* **`POST /user/login`**
    * **Operation ID:** `userAuthentication`
    * **Description:** Authenticates a user.
    * **Request Body:**
        * `UserAuthenticationDto` (required, application/json): User authentication details. See [Schemas](#schemas) for details.
    * **Responses:**
        * `200 OK`: Success.


### Parking Controller

* **`POST /parking/search`**
    * **Operation ID:** `getParkingLotsByZone`
    * **Description:** Searches for parking lots.
    * **Request Body:**
        * `ParkingLotSearchDto` (required, application/json): Parking lot search criteria. See [Schemas](#schemas) for details.
    * **Responses:**
        * `200 OK`: Success.

* **`POST /parking/book`**
    * **Operation ID:** `bookLater`
    * **Description:** Books a parking lot.
    * **Request Body:**
        * `ParkingBookingDto` (required, application/json): Parking booking details. See [Schemas](#schemas) for details.
    * **Responses:**
        * `200 OK`: Success (returns booking ID as an integer, int64).

* **`GET /parking/booking/{id}`**
    * **Operation ID:** `getBookingDetails`
    * **Description:** Retrieves booking details.
    * **Parameters:**
        * `id` (path, required, integer, int64): The ID of the booking.
    * **Responses:**
        * `200 OK`: Success (returns `Booking` object).


## Schemas

* **`UserRegistrationDto`**:
    * `email` (string, required)
    * `emailOtp` (integer, int32, minimum: 100000, maximum: 999999)
    * `password` (string, required, minLength: 8, maxLength: 20)
    * `name` (string, required)
    * `drivingLiscence` (string, required)
    * `role` (string, required, enum: `ROLE_CLIENT`, `ROLE_MANAGER`, `ROLE_OWNER`, `ROLE_ADMIN`)

* **`UserAuthenticationDto`**:
    * `email` (string, required)
    * `password` (string, required, minLength: 8, maxLength: 20)

* **`ParkingLotSearchDto`**:
    * `pincode` (integer, int64)
    * `address` (string)
    * `coords` (array of number, double)

* **`ParkingBookingDto`**:
    * `sectionId` (integer, int64, required)
    * `startDate` (string, date-time, required)
    * `endDate` (string, date-time, required)
    * `payment` (number, double, required)
    * `vehicleType` (string, enum: `TWO_WHEELER`, `FOUR_WHEELER`, `SIXTEEN_WHEELER`)

* **`Booking`**:
    * `id` (integer, int64)
    * `user` (User object)
    * `payment` (number, double)
    * `section` (Section object)
    * `startDate` (string, date-time)
    * `endDate` (string, date-time)
    * `status` (string, enum: `FAILED`, `REFUNDED`, `PROCESSED`, `PENDING`)
    * `creationTimestamp` (string, date-time)
    * `updationTimestamp` (string, date-time)

* **`Location`**:
    * `id` (integer, int64)
    * `longitude` (number, double)
    * `latitude` (number, double)

* **`ParkingLot`**:
    * `id` (integer, int64)
    * `address` (string)
    * `manager` (array of User objects, uniqueItems: true)
    * `sections` (array of Section objects, uniqueItems: true)
    * `owner` (User object)
    * `location` (Location object)

* **`Section`**:
    * `id` (integer, int64)
    * `lot` (ParkingLot object)
    * `occupancy` (integer, int32)
    * `capacity` (integer, int32)
    * `chargeRate` (number, double)
    * `vehicleType` (string, enum: `TWO_WHEELER`, `FOUR_WHEELER`, `SIXTEEN_WHEELER`)

* **`User`**:
    * `id` (integer, int64)
    * `email` (string)
    * `name` (string)
    * `drivingLiscence` (string)
    * `isActive` (boolean)
    * `role` (string, enum: `ROLE_CLIENT`, `ROLE_MANAGER`, `ROLE_OWNER`, `ROLE_ADMIN`)
    * `creationTimestamp` (string, date-time)
    * `updationTimestamp` (string, date-time)