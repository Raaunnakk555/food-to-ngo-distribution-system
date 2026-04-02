from flask import Flask, request, jsonify
from db import get_connection
from datetime import datetime, timedelta
import random

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend is running 🚀"

# ------------------ SIGNUP ------------------
@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role")

        conn = get_connection()
        cursor = conn.cursor()

        # Insert user
        cursor.execute(
            "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
            (name, email, password, role)
        )

        user_id = cursor.lastrowid

        # Role-specific table
        if role == "restaurant":
            cursor.execute(
                "INSERT INTO restaurants (user_id, restaurant_name) VALUES (%s, %s)",
                (user_id, name)
            )

        elif role == "ngo":
            total_capacity = data.get("total_capacity_smu")

            cursor.execute("""
                INSERT INTO ngos 
                (user_id, ngo_name, total_capacity_smu, remaining_capacity_smu)
                VALUES (%s, %s, %s, %s)
            """, (user_id, name, total_capacity, total_capacity))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "User created successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})


# ------------------ LOGIN ------------------
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Get user
        cursor.execute(
            "SELECT * FROM users WHERE email=%s AND password=%s",
            (email, password)
        )
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "Invalid credentials"})

        # 🔥 ADD THIS PART ONLY
        if user["role"] == "restaurant":
            cursor.execute(
                "SELECT restaurant_id FROM restaurants WHERE user_id=%s",
                (user["user_id"],)
            )
            res = cursor.fetchone()
            user["restaurant_id"] = res["restaurant_id"]

        elif user["role"] == "ngo":
            cursor.execute(
                "SELECT ngo_id FROM ngos WHERE user_id=%s",
                (user["user_id"],)
            )
            res = cursor.fetchone()
            user["ngo_id"] = res["ngo_id"]

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Login successful",
            "user": user
        })

    except Exception as e:
        return jsonify({"error": str(e)})


# ------------------ ADD FOOD ------------------
@app.route("/add-food", methods=["POST"])
def add_food():
    try:
        data = request.get_json()

        shelf_life = data.get("shelf_life_hours")
        expiry_time = datetime.now() + timedelta(hours=shelf_life)

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO food_items 
            (restaurant_id, food_name, food_type, shelf_life_hours, dry_or_wet,
             calorific_value, smu_equivalent, quantity_available_smu, expiry_time)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            data.get("restaurant_id"),
            data.get("food_name"),
            data.get("food_type"),
            shelf_life,
            data.get("dry_or_wet"),
            data.get("calorific_value"),
            data.get("smu_equivalent"),
            data.get("quantity_available_smu"),
            expiry_time
        ))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Food added successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})


# ------------------ GET FOOD ------------------
@app.route("/get-food", methods=["GET"])
def get_food():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM food_items WHERE expiry_time > NOW()")
        food = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(food)

    except Exception as e:
        return jsonify({"error": str(e)})


# ------------------ PLACE ORDER (SMU LOGIC) ------------------
@app.route("/place-order", methods=["POST"])
def place_order():
    try:
        data = request.get_json()

        ngo_id = data.get("ngo_id")
        food_id = data.get("food_id")
        requested_smu = data.get("quantity_smu")

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        # Check NGO capacity
        cursor.execute("SELECT remaining_capacity_smu FROM ngos WHERE ngo_id=%s", (ngo_id,))
        ngo = cursor.fetchone()

        if not ngo or ngo["remaining_capacity_smu"] < requested_smu:
            return jsonify({"error": "SMU limit exceeded"})

        # Generate OTP
        otp = str(random.randint(1000, 9999))
        otp_expiry = datetime.now() + timedelta(minutes=10)

        # Insert order
        cursor.execute("""
            INSERT INTO orders (ngo_id, food_id, quantity_smu, otp, otp_expiry)
            VALUES (%s, %s, %s, %s, %s)
        """, (ngo_id, food_id, requested_smu, otp, otp_expiry))

        # Update NGO capacity
        cursor.execute("""
            UPDATE ngos 
            SET remaining_capacity_smu = remaining_capacity_smu - %s 
            WHERE ngo_id=%s
        """, (requested_smu, ngo_id))

        # Update food quantity
        cursor.execute("""
            UPDATE food_items 
            SET quantity_available_smu = quantity_available_smu - %s 
            WHERE food_id=%s
        """, (requested_smu, food_id))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({
            "message": "Order placed",
            "otp": otp
        })

    except Exception as e:
        return jsonify({"error": str(e)})


# ------------------ VERIFY OTP ------------------
@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    try:
        data = request.get_json()

        order_id = data.get("order_id")
        entered_otp = data.get("otp")

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM orders WHERE order_id=%s", (order_id,))
        order = cursor.fetchone()

        if not order:
            return jsonify({"error": "Order not found"})

        if order["otp"] != entered_otp:
            return jsonify({"error": "Invalid OTP"})

        if datetime.now() > order["otp_expiry"]:
            return jsonify({"error": "OTP expired"})

        # Mark collected
        cursor.execute(
            "UPDATE orders SET order_status='collected' WHERE order_id=%s",
            (order_id,)
        )

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Pickup verified successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
