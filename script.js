function addToCart(productName, price, imageUrl) {
    // Get the cart from localStorage or initialize an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the selected product to the cart
    cart.push({ name: productName, price: price, image: imageUrl });

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Display a custom message (replaces alert)
    showAddedToCartMessage(productName);
}

// Function to show a temporary 'Item added to cart' message
function showAddedToCartMessage(productName) {
    // Create the message element
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.innerText = `${productName} added to cart!`;

    // Append the message to the body
    document.body.appendChild(message);

    // Remove the message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}
