from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import bcrypt

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Database Initialization
def init_db():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    """)
    conn.commit()
    conn.close()

# Initialize the database
init_db()

# Utility function to connect to the database
def connect_db():
    return sqlite3.connect("users.db")

# Sign-Up Endpoint
@app.route("/api/signup", methods=["POST"])
def signup():
    try:
        data = request.json
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"message": "Username and password are required!"}), 400

        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Insert the new user into the database
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_password))
        conn.commit()
        conn.close()

        return jsonify({"message": "Sign-up successful!"}), 200

    except sqlite3.IntegrityError:
        return jsonify({"message": "Username already exists!"}), 400

    except Exception as e:
        print("Error during sign-up:", str(e))  # Log the error for debugging
        return jsonify({"message": "An error occurred during sign-up."}), 500

# Login Endpoint
@app.route("/api/login", methods=["POST"])
def login():
    try:
        data = request.json
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"message": "Username and password are required!"}), 400

        # Fetch the user from the database
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT password FROM users WHERE username = ?", (username,))
        user = cursor.fetchone()
        conn.close()

        if user and bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
            return jsonify({"message": "Login successful!"}), 200
        else:
            return jsonify({"message": "Invalid username or password!"}), 401

    except Exception as e:
        print("Error during login:", str(e))  # Log the error for debugging
        return jsonify({"message": "An error occurred during login."}), 500

# Run the application
if __name__ == "__main__":
    app.run(debug=True)
