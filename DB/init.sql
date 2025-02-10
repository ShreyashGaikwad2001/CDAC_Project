create database parkngo_mailer_db;
use parkngo_mailer_db;

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    cypher_password VARCHAR(255) NOT NULL
);

CREATE TABLE client_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    template_title VARCHAR(50),
    subject VARCHAR(100),
    header TEXT,
    body TEXT,
    footer TEXT,
    template_keys TEXT,
    callback varchar(100),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    UNIQUE (client_id, template_title)
    );

CREATE TABLE mail_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    log_level VARCHAR(50) NOT NULL,
    accepted_recipients JSON NOT NULL,
    rejected_recipients JSON NOT NULL,
    message_id VARCHAR(255) NOT NULL,
    time_stamp DATETIME NOT NULL,
    smtp_response JSON NOT NULL
);

-- Parkngo Spring Main

-- -----------------------------------------------------
-- Schema parkngotest
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `parkngotest` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `parkngotest` ;

-- -----------------------------------------------------
-- Table `parkngotest`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `creation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `driving_liscence` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `is_active` BIT(1) NULL DEFAULT NULL,
  `name` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('ROLE_ADMIN', 'ROLE_CLIENT', 'ROLE_MANAGER', 'ROLE_OWNER') NULL DEFAULT NULL,
  `updation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `parkngotest`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`location` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `latitude` DOUBLE NULL DEFAULT NULL,
  `longitude` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `parkngotest`.`parking_lot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`parking_lot` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NOT NULL,
  `location_id` BIGINT NULL DEFAULT NULL,
  `owner_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `parkngotest`.`section`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`section` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `capacity` INT NOT NULL,
  `charge_rate` DOUBLE NULL DEFAULT NULL,
  `occupancy` INT NOT NULL,
  `vehicle_type` ENUM('FOUR_WHEELER', 'SIXTEEN_WHEELER', 'TWO_WHEELER') NULL DEFAULT NULL,
  `lot_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `parkngotest`.`booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`booking` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `creation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `end_date` DATETIME(6) NOT NULL,
  `payment` DOUBLE NULL DEFAULT NULL,
  `start_date` DATETIME(6) NOT NULL,
  `status` ENUM('FAILED', 'PENDING', 'PROCESSED', 'REFUNDED') NULL DEFAULT NULL,
  `updation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `section_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `parkngotest`.`emailotp`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`emailotp` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `creation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `emailotp` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `parkngotest`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`notification` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `creation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `message` VARCHAR(255) NULL DEFAULT NULL,
  `status` ENUM('DELIVERED', 'PENDING', 'STALE') NULL DEFAULT NULL,
  `updation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `parkngotest`.`parking_lot_manager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`parking_lot_manager` (
  `parking_lot_id` BIGINT NOT NULL,
  `manager_id` BIGINT NOT NULL);


-- -----------------------------------------------------
-- Table `parkngotest`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`review` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `creation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `score` INT NULL DEFAULT NULL,
  `updation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `lot_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `parkngotest`.`support_ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`support_ticket` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `creation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `type` ENUM('COMPLAINT', 'RECOMENDATION', 'REFUND') NULL DEFAULT NULL,
  `updation_timestamp` DATETIME(6) NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `parkngotest`.`zone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`zone` (
  `pincode` BIGINT NOT NULL,
  `north_west_bound_id` BIGINT NULL DEFAULT NULL,
  `south_east_bound_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY(`pincode`));


-- -----------------------------------------------------
-- Table `parkngotest`.`zone_lots`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `parkngotest`.`zone_lots` (
  `zone_pincode` BIGINT NOT NULL,
  `lots_id` BIGINT NOT NULL,
  PRIMARY KEY(`lots_id`));


-- SAMPLE DATA

INSERT INTO location (latitude, longitude) VALUES
(18.5204, 73.8567),
(18.5793, 73.759),
(18.4975, 73.9119),
(18.6258, 73.8164),
(5, 5); 

INSERT INTO user (id, creation_timestamp, driving_liscence, email, is_active, name, password, role, updation_timestamp) VALUES
(1, '2025-02-10 17:45:52.000000', 'DL12345', 'admin@example.com', 1, 'Admin User', '$2a$12$3LYqheGPrGjNFyp/q8rs2e/jq6H6.XP1CEN3yq4X.sYtj3Vw8zaLe', 'ROLE_ADMIN', '2025-02-10 17:45:52.000000'),
(2, '2025-02-10 17:45:52.000000', 'DL54321', 'client@example.com', 1, 'Client User', '$2a$12$yaKBia36vHobnvkBmXl4JedaBCHixiwcAGB2tiR3f5clJVn4bWBrG', 'ROLE_CLIENT', '2025-02-10 17:45:52.000000'),
(3, '2025-02-10 17:45:52.000000', 'DL98765', 'manager@example.com', 1, 'Manager User', '$2a$12$cz2sg24pxfF70u.bD9AIDep5TkhwwbHQT5ArspKCE.ldEkLzGhNz2', 'ROLE_MANAGER', '2025-02-10 17:45:52.000000'),
(4, '2025-02-10 17:45:52.000000', 'DL65432', 'owner@example.com', 1, 'Owner User', '$2a$12$/63z64jDL.H9C269T94OjedOE.YYq9OB0br1K6k.w0J4OYak1OuQO', 'ROLE_OWNER', '2025-02-10 17:45:52.000000'),
(5, '2025-02-10 17:49:24.968499', 'Manish', 'manishpatil7058@gmail.com', 1, 'Manish', '$2a$10$xOVOY/.hHecy8cGZGYCDnOL1FaDSY010jjcEGv2ZTjTOpMsjlbKMS', 'ROLE_ADMIN', '2025-02-10 17:49:24.968558');
-- pass for manish - Manish12


INSERT INTO parking_lot (id, address, location_id, owner_id) VALUES
(1, 'Sunbeam Infotech Private Limited, Hinjawadi - Kasarsai Road, Hinjawadi Phase II, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Maharashtra, India', 1, 1),
(2, 'TCG, T3, Hinjawadi Phase II, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Maharashtra, India', 2, 2),
(3, 'Hadapsar, Pune, Maharashtra, India', 3, 3),
(4, 'Wipro circle metro station, Hinjawadi Phase II, Hinjawadi Rajiv Gandhi Infotech Park, Hinjawadi, Pimpri-Chinchwad, Maharashtra, India', 4, 4);


-- zone table
INSERT INTO zone (pincode, north_west_bound_id, south_east_bound_id) VALUES
(411001, 1, 3),
(411019, 2, 4),
(411028, 3, 1),
(411046, 4, 2),
(411057, 5, 5);

-- zone_lots table (Assuming lot_id refers to parking_lot.id)
INSERT INTO zone_lots (zone_pincode, lots_id) VALUES  -- Added zone_pincode
(411057, 1),
(411057, 2),
(411057, 3),
(411057, 4);

-- Insert sample data into section
INSERT INTO `section` (capacity, charge_rate, occupancy, vehicle_type, lot_id)
VALUES
    (50, 20.00, 10, 'TWO_WHEELER', 1),
    (30, 50.00, 5, 'FOUR_WHEELER', 1),
    (20, 75.00, 2, 'FOUR_WHEELER', 2),
    (40, 30.00, 8, 'TWO_WHEELER', 2),
    (60, 25.00, 15, 'TWO_WHEELER', 3),
    (25, 60.00, 3, 'FOUR_WHEELER', 3),
    (35, 40.00, 7, 'TWO_WHEELER', 4),
    (15, 80.00, 1, 'FOUR_WHEELER', 4);