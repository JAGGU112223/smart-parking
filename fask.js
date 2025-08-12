document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Attempting login with username:", username); // Debug log

    try {
        const dbRef = ref(database);  // Reference to the database
        const snapshot = await get(child(dbRef, `users/${username}`));  // Fetch user data from Firebase
        console.log("Snapshot:", snapshot.exists()); // Check if the user exists

        if (snapshot.exists()) {
            const userData = snapshot.val();  // Fetch the user data
            console.log("User Data:", userData);  // Debug log to show fetched data

            if (userData.password === password) {
                window.location.href = "slots.html";  // Redirect on successful login
            } else {
                document.getElementById("loginMessage").textContent = "Incorrect password!";
                document.getElementById("loginMessage").style.color = "red";  // Show error message
            }
        } else {
            document.getElementById("loginMessage").textContent = "Username not found!";
            document.getElementById("loginMessage").style.color = "red";  // Show error message
        }
    } catch (error) {
        console.error("Error during login:", error);  // Log error to console for debugging
        document.getElementById("loginMessage").textContent = "An error occurred during login. Please try again.";
        document.getElementById("loginMessage").style.color = "red";  // Show error message
    }
});
