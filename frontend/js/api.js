const BASE_URL = "http://127.0.0.1:5000/api";

// MENU API (🔥 THIS WAS MISSING)
async function apiGetMenu() {
  const res = await fetch(`${BASE_URL}/menu/`);
  return res.json();
}

// CART APIs
async function apiAddToCart(item) {
  return fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  });
}

async function apiGetCart() {
  const res = await fetch(`${BASE_URL}/cart/`);
  return res.json();
}

async function apiUpdateCart(id, change) {
  return fetch(`${BASE_URL}/cart/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ change })
  });
}

async function apiRemoveItem(id) {
  return fetch(`${BASE_URL}/cart/remove/${id}`, {
    method: "DELETE"
  });
}
