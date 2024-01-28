// Add event listener to all add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.productId; // Retrieve product ID from dataset attribute
        addToCart(productId);
    });
});

// Function to add product to cart
function addToCart(productId) {
    // Get existing cart items from cookies or initialize an empty object
    let cartItems = JSON.parse(getCookie('cart')) || {};

    // Check if the product ID already exists in the cart
    if (cartItems[productId]) {
        // If it exists, increment the quantity by 1
        cartItems[productId]++;
    } else {
        // If it doesn't exist, set the quantity to 1
        cartItems[productId] = 1;
    }

    // Save the updated cart back to cookies
    setCookie('cart', JSON.stringify(cartItems));

    console.log('Product added to cart:', productId); // Log the product ID added to the cart
    console.log('Cart items:', cartItems); // Log the contents of the cart
}

// Function to set a cookie
function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Function to get a cookie
function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
