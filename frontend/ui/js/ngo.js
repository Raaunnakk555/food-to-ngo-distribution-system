window.addEventListener("DOMContentLoaded", function () {
if (typeof buildSurplusData === "function") {
  buildSurplusData();
}
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "ngo") {
  alert("Login required!");
  window.location.href = "ngo-login.html";
}

if (user.verified === false) {
  alert("NGO not verified yet!");
  window.location.href = "ngo-login.html";
  return;
}


const MAX_SMU = user.smuCapacity || 25;

function getDistanceText(rest) {

if (
  user.latitude == null ||
  user.longitude == null ||
  rest.latitude == null ||
  rest.longitude == null
)
  return "Distance: ~5 km";


  const dx = user.latitude - rest.latitude;
  const dy = user.longitude - rest.longitude;

  const dist =
    Math.sqrt(dx * dx + dy * dy) * 111;

  return `Distance: ${dist.toFixed(1)} km`;
}

function sortByDistance(data) {

  const mode =
    document.getElementById("sortMode")?.value;

  if (
    mode !== "distance" ||
    typeof sortRestaurantsByDistance !== "function"
  ) return data;

  return sortRestaurantsByDistance(user, data);
}


let usedSMU = 0;
function getExpiryStatus(item) {

  if (!item.publishedTime) return "Fresh";

  const now = Date.now();

  const expiry =
    item.publishedTime +
    item.shelfLife * 3600000;

  const remaining = expiry - now;

  if (remaining <= 0)
    return "Expired";

  if (remaining < 3600000)
    return "Near Expiry";

  return "Fresh";
}

let cart = [];
let chartInstance = null;

document.getElementById("cap").innerText =
  MAX_SMU.toFixed(2);

document.getElementById("used").innerText =
  "0.00";



if (typeof removeExpiredFood === "function") {
  try {
    removeExpiredFood();
  } catch (e) {
    console.log("Expiry check skipped:", e);
  }
}

function loadSurplus() {

  let data =
    JSON.parse(localStorage.getItem("allSurplus")) || [];

  console.log("Surplus data:", data);

  const list =
    document.getElementById("foodList");

  list.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    list.innerHTML =
      "<p>No surplus food available nearby.</p>";
    return;
  }

  data = sortByDistance(data);

  const search =
    (document.getElementById("searchBox").value || "")
      .toLowerCase();

  const filter =
    (document.getElementById("filterType").value || "all")
      .toLowerCase();

  let foundAnyItem = false;

  data.forEach(rest => {

    if (!rest || !Array.isArray(rest.items)) return;

    let restSection =
      document.createElement("div");

    restSection.innerHTML =
      `<h3>${rest.restaurant || "Unknown Restaurant"}
        <small>(${getDistanceText(rest)})</small>
       </h3>`;

    let hasItems = false;

    rest.items.forEach(item => {

      if (!item) return;
      if (!item.quantity || item.quantity <= 0) return;

      if (!item.name ||
          !item.name.toLowerCase().includes(search))
        return;

      
      if (
        filter !== "all" &&
        item.veg &&
        item.veg.toLowerCase() !== filter
      ) return;

      hasItems = true;
      foundAnyItem = true;

      const card =
        document.createElement("div");

      card.className = "card ngo-food-card";

      const status = getExpiryStatus(item);

card.innerHTML = `
  <h4>${item.name}</h4>
  <p>Calories: ${item.calories}</p>
  <p>SMU: ${item.smu}</p>
  <p>Available: ${item.quantity}</p>
  <p>Status: <b>${status}</b></p>
  <button onclick='addToCart(${JSON.stringify({...item, restaurant: rest.restaurant})})'>
    Add
  </button>
`;


      restSection.appendChild(card);
    });

    if (hasItems)
      list.appendChild(restSection);
  });

  if (!foundAnyItem) {
    list.innerHTML =
      "<p>No surplus food available nearby.</p>";
  }
}

window.addToCart = function(item) {
    if (getExpiryStatus(item) === "Expired") {
    alert("This food item has expired!");
    return;
  }
  if (usedSMU + item.smu > MAX_SMU) {
    alert("SMU limit exceeded!");
    return;
  }

  let surplus =
    JSON.parse(localStorage.getItem("allSurplus")) || [];

  let found = false;

  surplus.forEach(rest => {

    if (rest.restaurant === item.restaurant) {

      const realItem =
        rest.items.find(i => i.name === item.name);

      if (realItem && realItem.quantity > 0) {

        realItem.quantity--;
const users = getUsers();
const r = users.find(
  u => u.restaurantName === item.restaurant
);
if (r) {
  const m = r.menu.find(
    x => x.name === item.name
  );
  if (m) m.quantity = realItem.quantity;
  saveUsers(users);
}
 
        found = true;
      }
    }
  });

  if (!found) {
    alert("Item no longer available!");
    return;
  }

  localStorage.setItem(
    "allSurplus",
    JSON.stringify(surplus)
  );

  cart.push(item);
  usedSMU += item.smu;

  document.getElementById("used").innerText =
    usedSMU.toFixed(2);

  renderCart();
  updateProgress();
  loadSurplus(); 
}


function renderCart() {

  const div =
    document.getElementById("cartItems");

  div.innerHTML = "";

  cart.forEach((i, index) => {

    div.innerHTML += `
      <p>
        ${i.name} (${i.smu} SMU)
        <button onclick="removeItem(${index})">
          X
        </button>
      </p>
    `;
  });
}

window.removeItem = function(i) {

  const item = cart[i];

  let surplus =
    JSON.parse(localStorage.getItem("allSurplus")) || [];

  surplus.forEach(rest => {
    if (rest.restaurant === item.restaurant) {
      const found =
        rest.items.find(x => x.name === item.name);
      if (found) found.quantity++;
    }
  });

  localStorage.setItem(
    "allSurplus",
    JSON.stringify(surplus)
  );

  usedSMU -= item.smu;
  cart.splice(i, 1);

  document.getElementById("used").innerText =
    usedSMU.toFixed(2);

  renderCart();
  updateProgress();
  loadSurplus();
}

window.placeOrder = function() {

  if (cart.length === 0) {
    alert("Cart empty!");
    return;
  }

  const otp =
    Math.floor(100000 + Math.random() * 900000);

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    ngo: user.ngoName || "NGO",
    restaurants:[...new Set(cart.map(i => i.restaurant))],
    items: cart,
    time: new Date().toLocaleString(),
    smu: usedSMU.toFixed(2),
    otp: otp,
    status: "Pending"
  });

  localStorage.setItem(
    "orders",
    JSON.stringify(orders)
  );

  alert("Order OTP: " + otp);

  cart = [];
  usedSMU = 0;

  document.getElementById("used").innerText =
    "0.00";

  renderCart();
  loadOrders();
  updateChart();
  updateProgress();
  loadSurplus(); 
}

function updateGlobalSurplus() {

  let surplus =
    JSON.parse(localStorage.getItem("allSurplus")) || [];

  cart.forEach(item => {

    surplus.forEach(rest => {

      if (rest.restaurant === item.restaurant) {

        const found =
          rest.items.find(i => i.name === item.name);

        if (found) found.quantity--;
      }
    });
  });

  localStorage.setItem(
    "allSurplus",
    JSON.stringify(surplus)
  );
}


function loadOrders() {

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const div =
    document.getElementById("orderHistory");

  div.innerHTML = "";

  orders
    .filter(o => o.ngo === (user.ngoName || "NGO"))
    .forEach(o => {

      div.innerHTML += `
        <p>
          ${o.time}<br>
          SMU: ${o.smu}<br>
          OTP: ${o.otp}<br>
          Status:
<span style="
  color:${o.status==="Completed"?"green":"orange"};
  font-weight:bold;">
  ${o.status}
</span>

        </p>
        <hr>
      `;
    });
}

function updateChart() {

  if (!window.Chart) return;

  const canvas = document.getElementById("chart");
  if (!canvas) return;

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) return;

  const map = {};

  orders.forEach(o => {
    map[o.ngo] =
      (map[o.ngo] || 0) +
      parseFloat(o.smu);
  });

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(canvas, {
    type: "pie",
    data: {
      labels: Object.keys(map),
      datasets: [{
        data: Object.values(map)
      }]
    }
  });
}


function updateProgress() {

  const percent =
    (usedSMU / MAX_SMU) * 100;

  document.getElementById("progressFill")
    .style.width = percent + "%";

  const warn =
    document.getElementById("capacityWarning");

  if (percent >= 100) {

    warn.innerText =
      "SMU limit reached!";

    warn.style.color = "red";

  } else if (percent > 80) {

    warn.innerText =
      "Near capacity.";

    warn.style.color = "orange";

  } else {

    warn.innerText = "";
  }
}

window.logout = function () {
  localStorage.removeItem("user");
  window.location.href = "ngo-login.html";
};

loadSurplus();
loadOrders();
updateChart();
updateProgress();

});