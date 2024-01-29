document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function displayCartItems() {
        const cookieCart = JSON.parse(getCookie('cart')) || {};
        const productIds = Object.keys(cookieCart);
        const container = document.getElementById('shoppingcartcontainer');

        fetch('assets/js/database.json')
            .then(response => response.json())
            .then(data => {
                const matchedProducts = data.filter(product => productIds.includes(product.id.toString()));

                matchedProducts.forEach(product => {
                    const quantity = cookieCart[product.id.toString()];
                    updateProductDetails(product, quantity, container);
                });

                addRemoveButtonListeners();
            })
            .catch(error => console.error('Error loading data:', error));
    }

    function updateProductDetails(product, quantity, container) {
        // Create HTML for the product
        const price = product.price; // Assuming product.price is a string like '₱50.00'
        const priceValue = parseFloat(product.price.replace(',', '').substr(1));
        const productHTML = `
            <tr>
                <td>
                    <div class="cart-info">
                        <img src="${product.dir}/${product.idp}.png">
                        <div>
                            <p class="pname">${product.name}</p>
                            <a href="#" class="remove-button" data-product-id="${product.id}">Remove</a>
                        </div>
                    </div>
                </td>
                <td class="dropdown-container" data-base-price="${priceValue}"></td> 
                <td class="tdprice">${price}</td>
            </tr>
        `;
    
        // Get the tbody element to insert the product HTML
        let tbody = container.querySelector('tbody');
        // If tbody doesn't exist, create one
        if (!tbody) {
            tbody = document.createElement('tbody');
            container.appendChild(tbody);
        }
    
        // Append the product HTML to the tbody
        tbody.insertAdjacentHTML('beforeend', productHTML);
    }

    function addRemoveButtonListeners() {
        const removeButtons = document.querySelectorAll('.remove-button');

        removeButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); 

                const productId = button.getAttribute('data-product-id');

                removeItemFromCart(productId);

                button.closest('tr').remove();
            });
        });
    }

    function removeItemFromCart(productId) {
        const cookieCart = JSON.parse(getCookie('cart')) || {};
        delete cookieCart[productId];
        setCookie('cart', JSON.stringify(cookieCart), 30);
    }
});
