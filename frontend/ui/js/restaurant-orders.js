const rUser =
  JSON.parse(localStorage.getItem("user"));

if (!rUser || rUser.role !== "restaurant") {
  alert("Login required!");
  window.location.href = "restaurant-login.html";
}

function loadRestaurantOrders() {

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const div =
    document.getElementById("restaurantOrders");

  div.innerHTML = "";

  orders.forEach((o, index) => {

    if (o.status !== "Pending") return;

    if (
  !o.restaurants ||
  !o.restaurants.includes(
    rUser.restaurantName
  )
) return;


    const items =
      o.items
        .filter(i =>
          i.restaurant ===
          rUser.restaurantName)
        .map(i =>
          `${i.name}`)
        .join("<br>");

    div.innerHTML += `
      <div class="card">
        <b>NGO:</b> ${o.ngo}<br>
        <b>Items:</b><br>
        ${items}<br><br>
        OTP:
        <input id="otp${index}">
        <button onclick="verifyOrder(${index})">
          Verify Pickup
        </button>
      </div>
    `;
  });

  if (div.innerHTML === "")
    div.innerHTML =
      "<p>No pending orders.</p>";
}


function verifyOrder(index) {

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  if (!orders[index]) {
    alert("Order not found!");
    return;
  }

  const val =
    document
      .getElementById("otp" + index)
      .value
      .trim();

  if (String(val) === String(orders[index].otp)) {

    orders[index].status = "Completed";

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    alert("Order completed!");
    loadRestaurantOrders();

  } else {

    alert("Wrong OTP!");

  }
}

loadRestaurantOrders();
