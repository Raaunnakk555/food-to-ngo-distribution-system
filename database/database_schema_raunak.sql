CREATE DATABASE IF NOT EXISTS food_to_ngo;
USE food_to_ngo;
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('restaurant','ngo') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS food_items (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    food_name VARCHAR(100) NOT NULL,
    food_type ENUM('veg','non-veg','jain') NOT NULL,
    shelf_life_hours INT NOT NULL,
    dry_or_wet ENUM('dry','wet') NOT NULL,
    calorific_value INT,
    smu_equivalent INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    ngo_id INT,
    food_id INT,
    quantity_smu INT NOT NULL,
    otp VARCHAR(10),
    order_status ENUM('pending','collected','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SHOW TABLES;

