from flask import Flask, request, jsonify
from db import get_connection

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend is running 🚀"

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

        query = "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (name, email, password, role))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "User created successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM users WHERE email = %s AND password = %s"
        cursor.execute(query, (email, password))

        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if user:
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"error": "Invalid credentials"})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/add-food", methods=["POST"])
def add_food():
    try:
        data = request.get_json()

        restaurant_id = data.get("restaurant_id")
        food_name = data.get("food_name")
        food_type = data.get("food_type")
        shelf_life_hours = data.get("shelf_life_hours")
        dry_or_wet = data.get("dry_or_wet")
        calorific_value = data.get("calorific_value")
        smu_equivalent = data.get("smu_equivalent")

        conn = get_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO food_items 
        (restaurant_id, food_name, food_type, shelf_life_hours, dry_or_wet, calorific_value, smu_equivalent)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """

        cursor.execute(query, (
            restaurant_id,
            food_name,
            food_type,
            shelf_life_hours,
            dry_or_wet,
            calorific_value,
            smu_equivalent
        ))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Food added successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/get-food", methods=["GET"])
def get_food():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM food_items"
        cursor.execute(query)

        food = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(food)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
    