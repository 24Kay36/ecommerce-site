document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartList = document.getElementById("cart-list");
    let totalElement = document.getElementById("cart-total");
    let clearBtn = document.getElementById("clear-cart");
    let checkoutBtn = document.getElementById("checkout-btn");

    // Products catalog used to map data-id -> product details
    let products = [
        { id: 1, name: "Clothes", price: 245.00 },
        { id: 2, name: "Electronics", price: 435.00 }
    ];

    function showMessage(text) {
        if (!cartList) return;
        let msg = document.createElement("p");
        msg.textContent = text;
        msg.style.color = "green";
        msg.style.fontWeight = "bold";
        cartList.prepend(msg);
        setTimeout(() => msg.remove(), 1500);
    }

    function updateCart() {
        // Always persist cart even if we're not on the cart page
        localStorage.setItem("cart", JSON.stringify(cart));

        if (!cartList || !totalElement) return;

        cartList.innerHTML = "";

        if (cart.length === 0) {
            cartList.innerHTML = "<p>Your cart is empty</p>";
            totalElement.textContent = "Total:R0.00";
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }

        for (let i = 0; i < cart.length; i++) {
            let li = document.createElement("li");
            li.textContent = cart[i].name + " R" + cart[i].price.toFixed(2);

            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", function () {
                cart.splice(i, 1);
                updateCart();
            });

            li.appendChild(removeBtn);
            cartList.appendChild(li);
        }

        let total = cart.reduce((acc, item) => acc + item.price, 0);
        totalElement.textContent = "Total: R" + total.toFixed(2);

        if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
    }

    // Attach add-to-cart handlers (present on product.html)
    let buttons = document.querySelectorAll(".add-btn");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            let id = button.getAttribute("data-id");
            let product = products.find(p => p.id == id);
            if (!product) return;

            cart.push(product);
            updateCart();
            showMessage(product.name + " added to cart!");
        });
    });

    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            cart = [];
            updateCart();
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            alert(
                "Thank you for your order! Your total is R" +
                cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)
            );

            cart = [];
            updateCart();
        });
    }

    updateCart();
});