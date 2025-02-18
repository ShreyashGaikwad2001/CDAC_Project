# Front-End SPA Design

This document outlines the design of a front-end Single Page Application (SPA) that manages user and admin flows

**This application is built using (⚛️ ReactJS) and managed with yarn package manager**

## Functionality

The SPA handles the following functionalities:

**1. User Flow:**

*   **Login:** Secure user authentication.
*   **Registration:** New user account creation.
*   **Booking Search:** Searching for available bookings based on location
*   **Booking Details:** Viewing details of a specific booking.
*   **Booking Confirmation:** Confirming a booking.
*   **Booking Receipt:** Generating a printable receipt for a confirmed booking.

**2. Admin Flow:**

*   **System and Status View:** Monitoring system health and status.
*   **Service Analytics View:** Displaying analytics such as registered users and available lots.
*   **User Ban:** Ability to ban users from the service.

## Technologies and Implementation Details

*   **Client-Server Communication:** Axios is used for making HTTP requests to the server.
*   **JWT Handling:** JWT (JSON Web Token) is used for authentication.  Tokens is stored in session storage.
    *   **Note:** We acknowledge that session storage is not the most secure way to store tokens.  Ideally, they should be managed in memory (e.g., using React Context or a state management library like Redux).  However, for this implementation, we chose session storage to simplify development and avoid the perceived complexity of Redux. We understand the security implications and this would need to be addressed in production.
*   **Axios Interceptor:** An Axios interceptor is used to automatically add the JWT to the 		Authorization header of each request.
*	**Search:** 
	1. Exact location search
	2. General wide range search
		A list of parking lots is retrieved using pincode of the client divice.
		The pincode is retrieved using the **js geolocation api** and **google geocoder api**
	3. google maps component structure
		``` 
		src/components/MapWithDirection.jsx
			├── APIProvider
			├── Map
			└── Directions (./directions/Direction.jsx)
				├── useMapsLibrary
				└── useMap
			└── SearchBox (./searchWithAutocomplete/SearchBox.jsx)
				├── ControlPosition
				├── CustomMapControl (./Map-control.jsx)
					├── MapControl
					└── PlaceAutocompleteClassic (./Autocomplete-classic.jsx)
				└── MapHandler (./Map-handler.jsx)
					└── useMap
		```
