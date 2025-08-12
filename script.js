// Slot Booking Form Submission
document.getElementById("bookingForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const slot = document.getElementById("slot").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    // Validate inputs
    if (!slot) {
        alert("Please select a slot.");
        return;
    }

    if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
    }

    // Convert dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the number of days
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Ensure days is an integer

    if (days <= 0) {
        alert("End date must be after the start date.");
        return;
    }

    // Calculate cost based on selected slot
    const costPerDay = {
        "1": 50,
        "2": 70,
        "3": 100
    }[slot]; // Using an object lookup for clarity and scalability

    if (!costPerDay) {
        alert("Invalid slot selected!");
        return;
    }

    const totalCost = costPerDay * days;

    // Save booking details in localStorage
    localStorage.setItem("selectedSlot", `Slot ${slot}`);
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("totalCost", totalCost);

    // Redirect to payment page
    window.location.href = "payment.html";
});
