# Backend Architecture: Microservices with Spring Boot, Node.js, and MySQL

Our backend architecture employs a microservices approach, leveraging Spring Boot, Node.js, and MySQL.  The core user flow and CRUD operations are managed by the Spring Boot application, while the mailing service is handled by a separate Node.js service.

This design attempts to balance the benefits of both monolithic and microservice architectures.  Developing the business logic within the Spring Boot service proved more efficient, and initially, there was no pressing need to isolate communication and interaction failure points.

* The mailing service was separated for several key reasons:

    * Separation of Concerns: Isolating the mailing functionality promotes better code organization and maintainability.
    * Gmail Service Latency: The Gmail service used has a significant drawback: it can take up to 8 seconds to generate a response. This latency would negatively impact the responsiveness of the main application. This issue could be mitigated by using a paid email service.
    * Template-Based Mailing: The separate service facilitates template-based email generation. Instead of sending the entire email content with each request, only recipient details, template information, and placeholder values are transmitted. This significantly reduces the data payload.
    * Asynchronous Communication: Communication between the Spring Boot and Node.js services is asynchronous, further enhancing the responsiveness of the Spring application's API.
    * Node.js Platform Advantages: Utilizing Node.js and Express.js provides inherent multi-connection architecture and connection queuing, effectively creating an automatic mailing queue.

Communication between the two services is secured using JWT authentication and relies on hardcoded server addresses.

[We acknowledge that an API gateway is generally the recommended approach for managing communication between microservices.  However, we chose to forgo implementing an API gateway (and related components like Eureka for service discovery) due to the added complexity of configuring it with the Node.js application as there is no official eureka client for node and rquires a lot of manual configuration and causes integration problems.  This decision impacted our backend deployment, as cloud providers like Google and Amazon require services communicating with each other to be deployed within a Virtual Private Server (VPS). This introduced an additional configuration step.]