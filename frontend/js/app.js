// ===============================
// PAGE NAVIGATION
// ===============================
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => {
    p.classList.remove("active");
  });

  document.getElementById("page-" + page).classList.add("active");

  // Update navbar active link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");
  });

  const activeLink = document.getElementById("nav-" + page);
  if (activeLink) activeLink.classList.add("active");
}

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ===============================
// IMAGE MAPPING (TEMP SOLUTION)
// ===============================
const imageMap = {
  "Butter Chicken": "butterchickenwithrice.jpg",
  "Paneer Tikka": "cheese.jpg",
  "Biryani": "rice.jpg",
  "Chicken Wings": "crispychickenwings.jpg",
  "Samosa (2 pcs)": "samosa.jpg",
  "Samosa": "samosa.jpg",
  "Lamb Rogan Josh": "tandoorichickenwithrice.jpg",
  "Chicken Tikka Masala": "tandoorichickenwithrice.jpg",
  "Garlic Naan": "rice.jpg"
};

// ===============================
// LOAD MENU FROM BACKEND
// ===============================
async function loadMenu() {
  const items = await apiGetMenu();

  console.log("DATA:", items);

  const categoryMap = {
    "starter": "appetizers",
    "main": "mains",
    "side": "sides",
    "dessert": "desserts",
    "drink": "drinks"
  };

  // Clear all grids
  document.querySelectorAll(".menu-grid").forEach(g => g.innerHTML = "");

  items.forEach(item => {
    let rawCat = item.category.toLowerCase();
    let sectionId = categoryMap[rawCat];

    console.log("Mapping:", rawCat, "→", sectionId);

    if (!sectionId) {
      console.warn("Unknown category:", rawCat);
      return;
    }

    // 🔥 CRITICAL FIX (more reliable selector)
    const section = document.getElementById(sectionId);
    if (!section) {
      console.error("Section not found:", sectionId);
      return;
    }

    const grid = section.querySelector(".menu-grid");
    if (!grid) {
      console.error("Grid not found in:", sectionId);
      return;
    }

    const img = item.image;

    const card = document.createElement("div");
    card.className = "menu-item";

    card.innerHTML = `
      <div class="menu-item-img">
        <img src="assets/images/${img}" 
             style="width:100%;height:100%;object-fit:cover;border-radius:10px;" />
      </div>
      <div class="menu-item-body">
        <div class="menu-item-top">
          <span class="menu-item-name">${item.name}</span>
          <span class="menu-item-price">$${item.price}</span>
        </div>
        <p class="menu-item-desc">${item.category}</p>
        <button class="menu-add-btn"
          onclick="addToCart('${item.name}', ${item.price})">
          + Add
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}
// ===============================
// INITIAL LOAD
// ===============================
window.addEventListener("load", () => {
  console.log("WINDOW LOADED");
  loadMenu();
  loadCart();
});
