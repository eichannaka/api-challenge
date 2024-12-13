CREATE DATABASE IF NOT EXISTS api_challenge;

USE api_challenge;

CREATE TABLE locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(20) NOT NULL UNIQUE,
    bonus_minutes INT DEFAULT 0,
    penalty_minutes INT DEFAULT 0,
    last_rental_date DATETIME NULL
);

CREATE TABLE scooters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    identifier VARCHAR(50) NOT NULL UNIQUE,
    is_available BOOLEAN DEFAULT TRUE,
    location_id INT,  
    CONSTRAINT fk_location FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE rentals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    scooter_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NULL,
    total_minutes INT DEFAULT 0,
    initial_location  INT, 
    final_location INT,    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (scooter_id) REFERENCES scooters(id)
);





INSERT INTO users (dni, bonus_minutes, penalty_minutes) VALUES 
('12345678', 0, 0),
('87654321', 0, 0),
('11111111', 0, 0),
('22222222', 0, 0);

INSERT INTO scooters (identifier, location_id) VALUES
('SCOOTER_1', 3),
('SCOOTER_2', 1),
('SCOOTER_3', 5),
('SCOOTER_4', 4),
('SCOOTER_5', 2),
('SCOOTER_6', 6),
('SCOOTER_7', 3),
('SCOOTER_8', 5),
('SCOOTER_9', 1),
('SCOOTER_10', 6),
('SCOOTER_11', 2),
('SCOOTER_12', 4),
('SCOOTER_13', 5),
('SCOOTER_14', 3),
('SCOOTER_15', 1),
('SCOOTER_16', 6),
('SCOOTER_17', 2),
('SCOOTER_18', 4),
('SCOOTER_19', 3),
('SCOOTER_20', 1),
('SCOOTER_21', 5),
('SCOOTER_22', 2),
('SCOOTER_23', 4),
('SCOOTER_24', 6),
('SCOOTER_25', 5),
('SCOOTER_26', 6),
('SCOOTER_27', 6),
('SCOOTER_28', 6),
('SCOOTER_29', 6),
('SCOOTER_30', 6),
('SCOOTER_31', 6);



INSERT INTO locations (name, address) VALUES
('Caballito', 'Av. Rivadavia 5000'),
('Belgrano', 'Av. Crámer 2060'),
('Retiro Microcentro', 'Av. Leandro N. Alem 800'),
('Urquiza', 'Av. 1º de Mayo 3000'),
('Devoto', 'Av. San Martín 4500'),
('Villa del Parque', 'Av. Juan B. Justo 4200');

