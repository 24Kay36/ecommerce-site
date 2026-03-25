document.addEventListener("DOMContentLoaded", function() {

    let cart = [];
  
    let button = document.getElementById("add-to-cart");
    let button2 = document.getElementById("add-to-cart2");
    let cartList = document.getElementById("cart-list");

     console.log(button);
     console.log(button2);
      console.log(cartList);

    function updateCart() {
    cartList.innerHTML = "";

    // show items
    for (let i = 0; i < cart.length; i++) {
        let li = document.createElement("li");
        li.textContent = cart[i].name + " R" + cart[i].price;

        // remove button
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.style.marginLeft = "10px";

        removeBtn.addEventListener("click", function() {
            cart.splice(i, 1);
            updateCart();
        });

        li.appendChild(removeBtn);
        cartList.appendChild(li);
    }

    // calculate total (OUTSIDE loop)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
    }

    document.getElementById("cart-total").textContent =
        "Total: R" + total.toFixed(2);
}
        
    
     // add the first product to the cart 
    button.addEventListener("click", function() {
        let product1 = { name: "Clothes", price: 245.00 };
        cart.push(product1);
        updateCart();
    });
     // add second product to the cart
    button2.addEventListener("click", function() {
        let product2 = { name: "Electronics", price: 435.00 };
        cart.push(product2);
        updateCart();
    });

});