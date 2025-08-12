// Firebase Integration and form submission handling
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDIQOSfaxPNZ3S-QWkdCwvsqFS17YSl75Q",
        authDomain: "smartparking-83d14.firebaseapp.com",
        databaseURL: "https://smartparking-83d14-default-rtdb.firebaseio.com",
        projectId: "smartparking-83d14",
        storageBucket: "smartparking-83d14.appspot.com",
        messagingSenderId: "7613741307",
        appId: "1:7613741307:web:7bb54d907e5a9bf43fd85e",
        measurementId: "G-7NGPT6ZZ6T"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const database = firebase.database(app);

    const form = document.getElementById('paymentForm');
    const errorMessage = document.getElementById('errorMessage');

    // Form Submit Event Listener
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get form input values
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        const selectedSlot = document.getElementById('selectedSlot').textContent;
        const totalCost = document.getElementById('totalCost').textContent;

        // Validate the form fields
        if (!cardNumber || !expiryDate || !cvv) {
            errorMessage.textContent = "Please fill in all fields.";
            return;
        }

        // Here you can add additional validation for the card format, expiry date, etc.
        const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        if (!cardNumberPattern.test(cardNumber)) {
            errorMessage.textContent = "Please enter a valid card number.";
            return;
        }

        // Save payment details to Firebase Realtime Database
        try {
            // Create a unique ID using timestamp
            const paymentRef = database.ref('payments/' + new Date().toISOString());

            await paymentRef.set({
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
                slot: selectedSlot,
                cost: totalCost
            });

            // Show success message
            errorMessage.style.color = 'green';
            errorMessage.textContent = "Payment successful! Your booking is confirmed.";
            // Optionally, you could redirect to another page or show booking confirmation details
            // window.location.href = "confirmation_page.html";

        } catch (error) {
            console.error("Error saving payment data to Firebase:", error);
            errorMessage.style.color = 'red';
            errorMessage.textContent = "Payment failed. Please try again.";
        }
    });
});
