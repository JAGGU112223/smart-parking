// Extract URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Retrieve 'slot_id' and 'payment_amount' from the URL
const slotId = urlParams.get('slot_id') || 'Unknown'; // Default: 'Unknown'
const paymentAmount = urlParams.get('payment_amount') || 'Not Provided'; // Default: 'Not Provided'

// Update HTML elements dynamically
document.getElementById('slot-id').textContent = slotId;
document.getElementById('payment-amount').textContent = paymentAmount;

// Optional: Log values for debugging (can be removed in production)
console.log(`Slot ID: ${slotId}`);
console.log(`Payment Amount: ${paymentAmount}`);
