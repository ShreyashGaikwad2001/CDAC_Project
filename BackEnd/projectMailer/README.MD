## ParkngoMailer (nodejs and expressjs service)

Nodejs service for the backend


## API Endpoints

### Registration Endpoints

* **`POST /api/v1/register`**: Register a new client for the mailing service.

### Template Endpoints

* **`POST /api/v1/template`**: Create a new mail template for a client.
* **`GET /api/v1/template`**: Get all mail templates for a client.

### Mail Endpoints

* **`POST /api/v1/mail`**: Send an email using a template.
* **`GET /api/v1/mail`**: Get mail logs for a client.

### Other Endpoints

* **`GET /api/access.log`**: Retrieve the access logs.
* **`GET /api`**: Service health check endpoint. Returns version and status. 



### Registration Endpoints

* **`POST /api/v1/register`**
    * **Operation ID:** (Not explicitly defined in the code, but you could add a name like `registerClient`)
    * **Description:** Registers a new client for the mailing service.
    * **Request Body:**  (Details about the expected request body should be added here.  For example, what fields are required, their types, etc.)
    * **Responses:**
        * `201 Created`: Success. (Or other appropriate success code)

### Template Endpoints

* **`POST /api/v1/template`**
    * **Operation ID:** (e.g., `createMailTemplate`)
    * **Description:** Creates a new mail template for a client.
    * **Request Body:** (Details about the expected request body. Include fields like `templateTitle`, `mailTemplate`, `keys`, `callback` and their types.)
    * **Responses:**
        * `201 Created`: Success.
        * `409 Conflict`: Template with that name already exists.
        * `500 Internal Server Error`: An internal server error occurred.

* **`GET /api/v1/template`**
    * **Operation ID:** (e.g., `getClientTemplates`)
    * **Description:** Gets all mail templates for a client.
    * **Responses:**
        * `201 Created`: Success.
        * `500 Internal Server Error`: An internal server error occurred.

### Mail Endpoints

* **`POST /api/v1/mail`**
    * **Operation ID:** (e.g., `sendMail`)
    * **Description:** Sends an email using a template.
    * **Request Body:** (Details about the expected request body. Include fields like `templateName`, `recipients`, `entries`, `callback` and their types.)
    * **Responses:**
        * `202 Accepted`: Request received. (The actual sending is asynchronous)

* **`GET /api/v1/mail`**
    * **Operation ID:** (e.g., `getMailLogs`)
    * **Description:** Gets mail logs for a client.
    * **Parameters:**
        * `page` (query, optional, integer): Page number for pagination.
        * `limit` (query, optional, integer): Number of logs per page.
    * **Responses:**
        * `200 OK`: Success.

### Other Endpoints

* **`GET /api/access.log`**
    * **Operation ID:** (e.g., `getAccessLogs`)
    * **Description:** Retrieves the access logs.
    * **Responses:**
        * `200 OK`: Success.

* **`GET /api`**
    * **Operation ID:** (e.g., `healthCheck`)
    * **Description:** Service health check endpoint. Returns version and status.
    * **Responses:**
        * `200 OK`: Success (returns a JSON object with `version` and `status`).

## Authentication

All endpoints under `/api/v1` except `/api/v1/register` require JWT authentication
