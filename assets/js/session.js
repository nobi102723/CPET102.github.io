document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.productId; 
        addToCart(productId);
    });
});

function addToCart(productId) {
    let cartItems = JSON.parse(getCookie('cart')) || {};

    if (cartItems[productId]) {
        cartItems[productId]++;
    } else {
        cartItems[productId] = 1;
    }

    setCookie('cart', JSON.stringify(cartItems));

    console.log('Product added to cart:', productId); 
    console.log('Cart items:', cartItems); 
}

function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

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
