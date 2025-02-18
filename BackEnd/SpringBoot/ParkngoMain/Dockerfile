# Stage 1: Build the Spring Boot application
FROM maven:3.8.6-amazoncorretto-17 AS build

WORKDIR /app

# Copy the project files
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Create the final image
FROM amazoncorretto:17-alpine-jdk

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/spring_boot_backend_parkngo-0.0.1-SNAPSHOT.jar /app/app.jar 
# Replace your-spring-boot-app.jar

# Expose the port
EXPOSE 9443

# Set the entrypoint to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

COPY application.yml /app/application.yml
