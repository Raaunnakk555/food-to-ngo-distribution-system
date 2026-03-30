CREATE DATABASE IF NOT EXISTS food_to_ngo;
USE food_to_ngo;

-- USERS TABLE
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('restaurant','ngo') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RESTAURANTS
CREATE TABLE restaurants (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    restaurant_name VARCHAR(150) NOT NULL,
    address TEXT,
    phone VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- NGOS
CREATE TABLE ngos (
    ngo_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    ngo_name VARCHAR(150) NOT NULL,
    address TEXT,
    phone VARCHAR(15),
    total_capacity_smu INT NOT NULL,
    remaining_capacity_smu INT NOT NULL, -- 🔥 IMPORTANT
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- FOOD ITEMS
CREATE TABLE food_items (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    food_name VARCHAR(100) NOT NULL,
    food_type ENUM('veg','non-veg','jain') NOT NULL,
    shelf_life_hours INT NOT NULL,
    dry_or_wet ENUM('dry','wet') NOT NULL,
    calorific_value INT,
    smu_equivalent INT NOT NULL,
    quantity_available_smu INT NOT NULL, -- 🔥 IMPORTANT
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_time DATETIME, -- 🔥 IMPORTANT
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE
);

-- ORDERS
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    ngo_id INT,
    food_id INT,
    quantity_smu INT NOT NULL,
    otp VARCHAR(10),
    otp_expiry DATETIME, -- 🔥 IMPORTANT
    order_status ENUM('pending','collected','cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ngo_id) REFERENCES ngos(ngo_id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food_items(food_id) ON DELETE CASCADE
);

-- INDEXES (🔥 PERFORMANCE BOOST)
CREATE INDEX idx_food_restaurant ON food_items(restaurant_id);
CREATE INDEX idx_orders_ngo ON orders(ngo_id);
