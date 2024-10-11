// Get cart items from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let rewards = JSON.parse(localStorage.getItem('rewards')) || 0; // Track rewards in localStorage

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItemsContainer.innerHTML = ''; // Clear any existing items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div class="cart-item-content">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <button onclick="proceedToBuy(${index})">Proceed to Buy</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
            total += item.price; // Add price to total
        });
    }

    cartTotal.innerText = `Total: $${total.toFixed(2)}`; // Update total price display
}

// Function to handle "Proceed to Buy All"
function proceedToBuyAll() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    alert(`Proceeding to buy all items for $${total.toFixed(2)}.`);

    // Navigate to the payment page for all items
    localStorage.setItem('cartToBuy', JSON.stringify(cart)); // Pass all items to payment page
    localStorage.setItem('totalAmount', total.toFixed(2)); // Save the total amount for payment
    window.location.href = 'payment.html'; 
}

// Function to handle individual "Proceed to Buy"
function proceedToBuy(index) {
    const selectedItem = cart[index];
    localStorage.setItem('selectedItem', JSON.stringify(selectedItem)); 
    window.location.href = 'payment.html'; // Navigate to the payment page for a single item
}

// Function to add rewards after payment
function addRewards(amount) {
    const rewardPoints = calculateRewards(amount); // Assume reward points based on amount
    rewards += rewardPoints;
    localStorage.setItem('rewards', JSON.stringify(rewards)); // Update rewards in localStorage
    alert(`Congratulations! You've earned ${rewardPoints} reward points.`);
}

// Function to calculate rewards based on total amount
function calculateRewards(amount) {
    // Example: 1 reward point for every $10 spent
    return Math.floor(amount / 10);
}

// Function to handle "Add to Cart"
function addToCart(productName, price, image) {
    const isItemInCart = cart.some(item => item.name === productName);

    const messageDiv = document.getElementById('message');
    if (!isItemInCart) {
        const newItem = { name: productName, price: price, image: image };
        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        displayCartItems();

        messageDiv.innerText = `${productName} has been added to your cart.`;
        messageDiv.style.color = 'green'; // Positive feedback
    } else {
        messageDiv.innerText = `${productName} is already in your cart.`;
        messageDiv.style.color = 'red'; // Warning feedback
    }
    setTimeout(() => {
        messageDiv.innerText = '';
    }, 3000); // Clear the message after 3 seconds
}

// Function to handle "Clear Cart"
function clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        localStorage.removeItem('cart');
        displayCartItems();
        alert('Cart has been cleared.');
    }
}

// Display the cart items on page load
window.onload = displayCartItems;
