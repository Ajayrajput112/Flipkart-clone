// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const products = [
        { id: 1, name: "Product 1", price: 1000 },
        { id: 2, name: "Product 2", price: 2000 },
        // Add more products as needed
    ];

    const cartBtn = document.getElementById("cart-btn");
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartModal = document.getElementById("cart-modal");
    
    // Add to cart event listener
    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.target.closest(".product").dataset.id;
            addToCart(parseInt(productId));
        });
    });

    // Add product to the cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
    }

    // Update cart display
    function updateCart() {
        cartCount.textContent = cart.length;
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} (₹${item.price}) x ${item.quantity}`;
            cartItemsList.appendChild(listItem);

            total += item.price * item.quantity;
        });

        cartTotal.textContent = total;
    }

    // Show/hide cart modal
    cartBtn.addEventListener("click", () => {
        cartModal.style.display = cartModal.style.display === "none" ? "block" : "none";
    });

    // Checkout functionality (can be extended)
    document.getElementById("checkout-btn").addEventListener("click", () => {
        alert("Proceeding to checkout...");
        cart.length = 0; // Clear cart after checkout
        updateCart();
        cartModal.style.display = "none";
    });
});
