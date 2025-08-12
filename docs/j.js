 // Import Firebase SDKs
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
 import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

 // Firebase configuration
 const firebaseConfig = {
     apiKey: "AIzaSyDEL7SbaGiCR99UJPcrxheV9UawyoX_Pfo",
     authDomain: "smtparking-87e24.firebaseapp.com",
     databaseURL: "https://smtparking-87e24-default-rtdb.firebaseio.com/",
     projectId: "smtparking-87e24",
     storageBucket: "smtparking-87e24.appspot.com",
     messagingSenderId: "1042261909431",
     appId: "1:1042261909431:web:f4a0f5f5213506fbaa9232",
     measurementId: "G-3KZ1ZLL1LE"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);

 // Event Listener for Login Form Submission
 document.getElementById("loginForm").addEventListener("submit", (event) => {
     event.preventDefault(); // Prevent page reload

     // Get username and password
     const username = document.getElementById("username").value.trim();
     const password = document.getElementById("password").value.trim();

     // Check for user in Firebase
     const dbRef = ref(db);
     get(child(dbRef, `users/${username}`))
         .then((snapshot) => {
             if (snapshot.exists()) {
                 const userData = snapshot.val();
                 if (userData.password === password) {
                     alert("Login Successful!");
                 } else {
                     alert("Incorrect Password!");
                 }
             } else {
                 alert("User does not exist!");
             }
         })
         .catch((error) => {
             console.error("Error fetching data:", error);
             alert("Error: " + error.message);
         });
 });

 // Event Listener for Sign-Up Form Submission
 document.getElementById("signUpForm").addEventListener("submit", (event) => {
     event.preventDefault(); // Prevent page reload

     // Get new username and password
     const username = document.getElementById("newUsername").value.trim();
     const password = document.getElementById("newPassword").value.trim();
     const confirmPassword = document.getElementById("confirmPassword").value.trim();

     if (password !== confirmPassword) {
         alert("Passwords do not match!");
         return;
     }

     // Save new user to Firebase
     set(ref(db, `users/${username}`), { username, password })
         .then(() => {
             alert("Sign-Up Successful!");
             // Optionally switch back to login
             document.querySelector(".signup-container").style.display = "none";
             document.querySelector(".login-container").style.display = "block";
         })
         .catch((error) => {
             console.error("Error saving data:", error);
             alert("Error: " + error.message);
         });
 });

 // Switching between login and sign-up forms
 document.getElementById("switchToSignUp").addEventListener("click", () => {
     document.querySelector(".login-container").style.display = "none";
     document.querySelector(".signup-container").style.display = "block";
 });

 document.getElementById("switchToLogin").addEventListener("click", () => {
     document.querySelector(".signup-container").style.display = "none";
     document.querySelector(".login-container").style.display = "block";
 });
 
