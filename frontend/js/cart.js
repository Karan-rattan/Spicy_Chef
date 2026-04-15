async function addToCart(name, price) {
  try {
    await apiAddToCart({ name, price });

    alert("Added to cart ✅");
    loadCart();
  } catch (err) {
    console.error(err);
    alert("Error ❌");
  }
}

async function loadCart() {
  const items = await apiGetCart();

  const container = document.getElementById("cartItems");
  const count = document.getElementById("cartCountLabel");

  if (!items.length) {
    container.innerHTML = "Cart empty 🍽️";
    count.innerText = "0 items";
    return;
  }

  let html = "";
  let subtotal = 0;

  items.forEach(item => {
    subtotal += item.price * item.quantity;

    html += `
      <div class="cart-item">
        <div class="cart-item-body">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>

          <div class="qty-control">
            <button onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${item.id}, 1)">+</button>
          </div>

          <button onclick="removeItem(${item.id})">❌ Remove</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  count.innerText = items.length + " items";

  const tax = subtotal * 0.085;
  const total = subtotal + tax + 3.99;

  document.getElementById("cartSubtotal").innerText = "$" + subtotal.toFixed(2);
  document.getElementById("cartTax").innerText = "$" + tax.toFixed(2);
  document.getElementById("cartTotal").innerText = "$" + total.toFixed(2);
}

async function changeQty(id, change) {
  await apiUpdateCart(id, change);
  loadCart();
}

async function removeItem(id) {
  await apiRemoveItem(id);
  loadCart();
}

// Load on start
window.onload = loadCart;
