// Get the selected item or all cart items from localStorage
const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
const cartToBuy = JSON.parse(localStorage.getItem('cartToBuy'));
const totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

// Function to display payment details
function displayPaymentDetails() {
    const paymentDetails = document.getElementById('payment-details');
    
    if (selectedItem) {
        // If the user is buying a single item
        paymentDetails.innerHTML = `
            <p>You're about to purchase: <strong>${selectedItem.name}</strong></p>
            <p>Price: $${selectedItem.price.toFixed(2)}</p>
        `;
    } else if (cartToBuy) {
        // If the user is buying all items in the cart
        let itemsList = cartToBuy.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join('');
        paymentDetails.innerHTML = `
            <p>You're about to purchase the following items:</p>
            <ul>${itemsList}</ul>
            <p><strong>Total Amount: $${totalAmount.toFixed(2)}</strong></p>
        `;
    } else {
        paymentDetails.innerHTML = '<p>No item selected for payment.</p>';
    }
}

// Call this function to populate the payment details on page load
displayPaymentDetails();

// Function to simulate payment processing
function processPayment() {
    if (selectedItem || cartToBuy) {
        // Simulate a payment success
        alert('Payment successful!');

        // Calculate rewards based on the total amount (1 reward point for every $10)
        const rewardPoints = Math.floor(totalAmount / 10) * 5; // 5 points for each $10 spent

        // Update the user's reward points
        addRewardPoints(rewardPoints); 

        // Clear selected items and cart data from localStorage after payment
        localStorage.removeItem('selectedItem');
        localStorage.removeItem('cartToBuy');
        localStorage.removeItem('totalAmount');

        // Redirect to "My Account" page
        window.location.href = 'my-account.html';
    }
}

// Function to add reward points to user's account
function addRewardPoints(points) {
    let rewardPoints = parseInt(localStorage.getItem('rewardPoints')) || 0;
    rewardPoints += points;
    localStorage.setItem('rewardPoints', rewardPoints);
}

// Display total reward points on the page (optional)
function displayRewardPoints() {
    const rewardDisplay = document.getElementById('reward-points');
    let rewardPoints = parseInt(localStorage.getItem('rewardPoints')) || 0;
    rewardDisplay.innerHTML = `Total Reward Points: ${rewardPoints}`;
}

// Optional: Call displayRewardPoints if you're showing rewards on the payment page
displayRewardPoints();

