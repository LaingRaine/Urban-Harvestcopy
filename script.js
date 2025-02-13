const cartItemsContainer = document.getElementById("cart-items");
const clearCartBtn = document.getElementById("clear-cart");

// Load cart from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to display cart
function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <div>
                <button class="decrease" data-index="${index}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-index="${index}">+</button>
                <button class="remove" data-index="${index}">❌</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    attachEventListeners();
}

// Attach event listeners for buttons
function attachEventListeners() {
    document.querySelectorAll(".increase").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            cart[index].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        });
    });

    document.querySelectorAll(".decrease").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        });
    });

    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        });
    });
}

// Clear Cart
clearCartBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    cart = [];
    updateCartDisplay();
});

// Initial cart display
updateCartDisplay();
