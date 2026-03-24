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

        for (let i = 0; i < cart.length; i++) {
            let li = document.createElement("li");
            li.textContent = cart[i].name + " R" + cart[i].price;
            cartList.appendChild(li);

            // remove button
            let remove=document.createElement("button");
            removeBtn.textContent="Remove";
            removeBtn.style.marginLeft="10px";
            removeBtn.addEventListener("click",function(){
                cart.splice(i,1);  // remove this item
                updateCart();
            })
            li.appendChild(removeBtn);// adds a node to the end of a parent node's child list
            cartList.appendChild(li);
            let total=0;
            for(let i=0;i<cart.length;i++){
                total=total+cart[i].price;
            }
          document.getElementById("cart-total").textContent="Total: R"+total.toFixed(2);
        }
    }

    button.addEventListener("click", function() {
        let product1 = { name: "Clothes", price: 245 };

        cart.push(product1);
        updateCart();
    });

    button2.addEventListener("click", function() {
        let product2 = { name: "Electronics", price: 435 };

        cart.push(product2);
        updateCart();
    });

});