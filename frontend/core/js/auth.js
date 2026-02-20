const NGO_REGISTRY = [
  { darpan: "DARPAN001", ngoName: "NGO A", adults: 20, children: 5, elderly: 0 },
  { darpan: "DARPAN002", ngoName: "NGO B", adults: 10, children: 10, elderly: 5 },
  { darpan: "DARPAN003", ngoName: "NGO C", adults: 30, children: 0, elderly: 0 },
  { darpan: "DARPAN004", ngoName: "NGO D", adults: 8, children: 12, elderly: 4 },
  { darpan: "DARPAN005", ngoName: "NGO E", adults: 15, children: 10, elderly: 0 }
];

function calculateSMU(adults, children, elderly) {
  return (
    adults * 1.0 +
    children * 0.7 +
    elderly * 0.8
  );
}

if (!localStorage.getItem("users")) {

function calculateFoodSMU(calories) {
    return parseFloat((calories / 600).toFixed(2));
}
    function getFoodType(category) {
        const wetCategories = [
            "Juices", "Shakes", "Main Course",
            "Pasta", "Desserts"
        ];
        return wetCategories.includes(category) ? "Wet" : "Dry";
    }

    let foodCounter = 1;

    function createItem(restaurantId, name, category, type, calories, shelfLife) {
        return {
            food_id: foodCounter++,
            restaurant_id: restaurantId,
            name: name,
            category: category,
            veg: type,
            foodType: getFoodType(category),
            calories: calories,
            shelfLife: shelfLife,
            smu: calculateFoodSMU(calories),
            quantity: 0,
            status: "Not Published",
            publishedTime: null
        };
    }

    const mayuriMenu = [
        createItem(1,"Watermelon Juice","Juices","Veg",60,2),
        createItem(1,"Pineapple Juice","Juices","Veg",130,2),
        createItem(1,"Mixed Fruit Juice","Juices","Veg",150,2),
        createItem(1,"Orange Juice","Juices","Veg",110,2),
        createItem(1,"Rose Shake","Shakes","Veg",250,3),
        createItem(1,"Black Currant Shake","Shakes","Veg",270,3),
        createItem(1,"KitKat Shake","Shakes","Veg",350,3),
        createItem(1,"Oreo Milk Shake","Shakes","Veg",360,3),
        createItem(1,"Peanut Butter Shake","Shakes","Veg",400,4),
        createItem(1,"Hazelnut Chocolate Shake","Shakes","Veg",420,4),
        createItem(1,"Belgian Chocolate Shake","Shakes","Veg",450,4),
        createItem(1,"Cold Coffee","Shakes","Veg",180,4),
        createItem(1,"Cold Coffee + Ice Cream","Shakes","Veg",300,3),
        createItem(1,"Iced Cold Coffee","Shakes","Veg",200,4),
        createItem(1,"Veg Noodles","Chinese","Veg",300,4),
        createItem(1,"Veg Hakka Noodles","Chinese","Veg",320,4),
        createItem(1,"Schezwan Noodles","Chinese","Veg",350,4),
        createItem(1,"Chilli Paneer","Chinese","Veg",380,5),
        createItem(1,"Arrabbiata Pasta","Pasta","Veg",360,5),
        createItem(1,"Alfredo Pasta","Pasta","Veg",420,5),
        createItem(1,"Farmhouse Pizza","Pizza","Veg",500,6),
        createItem(1,"Tandoori Paneer Pizza","Pizza","Veg",520,6),
        createItem(1,"Cheese Corn Tomato Pizza","Pizza","Veg",480,6),
        createItem(1,"Quesadilla","Mexican","Veg",400,5),
        createItem(1,"Aglio Olio Pasta","Pasta","Veg",330,5),
        createItem(1,"Veg Momo","Momos","Veg",180,3),
        createItem(1,"Veg Fried Momo","Momos","Veg",260,3),
        createItem(1,"Veg Kurkure Momo","Momos","Veg",300,3),
        createItem(1,"Paneer Momo","Momos","Veg",220,3),
        createItem(1,"Paneer Fried Momo","Momos","Veg",320,3),
        createItem(1,"Veg Loaded Sandwich","Sandwich","Veg",350,5),
        createItem(1,"Corn Paneer Tikka Sandwich","Sandwich","Veg",380,5),
        createItem(1,"Veg Club Sandwich","Sandwich","Veg",420,5),
        createItem(1,"Veg Classic Burger","Burger","Veg",300,5),
        createItem(1,"Barbeque Paneer Burger","Burger","Veg",420,5),
        createItem(1,"Hotdog","Fast Food","Veg",280,5),
        createItem(1,"Paneer Cheese Hotdog","Fast Food","Veg",360,5),
        createItem(1,"Soya Protein Roll","Roll","Veg",320,4),
        createItem(1,"Mexican Roll","Roll","Veg",340,4),
        createItem(1,"Paneer Makhani Roll","Roll","Veg",380,4),
        createItem(1,"Paneer Butter Masala","Main Course","Veg",420,6),
        createItem(1,"Kadai Paneer","Main Course","Veg",380,6),
        createItem(1,"Paneer Tikka Masala","Main Course","Veg",400,6),
        createItem(1,"Paneer Lababdar","Main Course","Veg",450,6),
        createItem(1,"Dal Fry","Main Course","Veg",250,6),
        createItem(1,"Dal Tadka","Main Course","Veg",270,6),
        createItem(1,"Dal Makhani","Main Course","Veg",350,6),
        createItem(1,"Seasonal Veg","Main Course","Veg",220,6),
        createItem(1,"Plain Rice","Rice","Veg",200,8),
        createItem(1,"Jeera Rice","Rice","Veg",250,8),
        createItem(1,"Veg Pulao","Rice","Veg",280,8),
        createItem(1,"Veg Biryani","Rice","Veg",350,8),
        createItem(1,"Tandoori Roti","Bread","Veg",120,12),
        createItem(1,"Butter Naan","Bread","Veg",180,12),
        createItem(1,"Garlic Naan","Bread","Veg",200,12),
        createItem(1,"Butter Kulcha","Bread","Veg",220,12)
    ];

    const dakshinMenu = [

        createItem(2,"Plain Idli","Breakfast","Veg",60,5),
        createItem(2,"Masala Idli","Breakfast","Veg",120,5),
        createItem(2,"Ghee Idli","Breakfast","Veg",150,5),
        createItem(2,"Plain Dosa","Breakfast","Veg",170,4),
        createItem(2,"Masala Dosa","Breakfast","Veg",250,4),
        createItem(2,"Mysore Dosa","Breakfast","Veg",280,4),
        createItem(2,"Onion Dosa","Breakfast","Veg",220,4),
        createItem(2,"Ghee Roast","Breakfast","Veg",300,4),

        createItem(2,"Chicken Biryani","Main Course","Non-Veg",450,6),
        createItem(2,"Egg Biryani","Main Course","Egg",380,6),
        createItem(2,"Chicken 65","Starters","Non-Veg",320,5),
        createItem(2,"Chicken Tikka","Starters","Non-Veg",300,5),
        createItem(2,"Butter Chicken Masala","Main Course","Non-Veg",480,6),
        createItem(2,"Chicken Chettinad","Main Course","Non-Veg",420,6),

        createItem(2,"Veg Fried Rice","Rice","Veg",300,6),
        createItem(2,"Veg Noodles","Chinese","Veg",320,6),
        createItem(2,"Chicken Fried Rice","Rice","Non-Veg",380,6),
        createItem(2,"Egg Fried Rice","Rice","Egg",340,6),
        createItem(2,"Chicken Noodles","Chinese","Non-Veg",400,6),

        createItem(2,"Gulab Jamun","Desserts","Veg",180,12),
        createItem(2,"Brownie","Desserts","Veg",350,24),
        createItem(2,"Donut","Desserts","Veg",280,24),
        createItem(2,"Chocolate Lava Cake","Desserts","Veg",420,12)
    ];

    const bistroMenu = [

  createItem(3,"Chipotle Mac n Cheese (Veg)","Pasta","Veg",480,6),
  createItem(3,"Chipotle Mac n Cheese (Chicken)","Pasta","Non-Veg",550,6),
  createItem(3,"Makhni Mac n Cheese (Veg)","Pasta","Veg",500,6),
  createItem(3,"Makhni Mac n Cheese (Chicken)","Pasta","Non-Veg",580,6),
  createItem(3,"Tandoori Mac n Cheese (Veg)","Pasta","Veg",510,6),
  createItem(3,"Tandoori Mac n Cheese (Chicken)","Pasta","Non-Veg",600,6),
  createItem(3,"Alfredo Pasta (Veg)","Pasta","Veg",420,6),
  createItem(3,"Alfredo Pasta (Chicken)","Pasta","Non-Veg",480,6),
  createItem(3,"Arrabiata Pasta (Veg)","Pasta","Veg",380,6),
  createItem(3,"Arrabiata Pasta (Chicken)","Pasta","Non-Veg",440,6),
  createItem(3,"Aglio Olio Pasta","Pasta","Veg",360,6),
  createItem(3,"Veg Saucy Momos","Momos","Veg",280,4),
  createItem(3,"Paneer Saucy Momos","Momos","Veg",320,4),
  createItem(3,"Chicken Saucy Momos","Momos","Non-Veg",360,4),
  createItem(3,"Hakka Noodles (Veg)","Chinese","Veg",330,6),
  createItem(3,"Hakka Noodles (Non-Veg)","Chinese","Non-Veg",390,6),
  createItem(3,"Chilly Garlic Noodles (Veg)","Chinese","Veg",350,6),
  createItem(3,"Chilly Garlic Noodles (Non-Veg)","Chinese","Non-Veg",420,6),
  createItem(3,"Schezwan Noodles (Veg)","Chinese","Veg",360,6),
  createItem(3,"Schezwan Noodles (Non-Veg)","Chinese","Non-Veg",430,6),
  createItem(3,"Veg Fried Rice","Rice","Veg",300,6),
  createItem(3,"Schezwan Fried Rice","Rice","Veg",340,6),
  createItem(3,"Burnt Garlic Noodles","Chinese","Veg",370,6),
  createItem(3,"Crispy Noodles","Chinese","Veg",400,6),
  createItem(3,"Egg Fried Rice","Rice","Egg",360,6),
  createItem(3,"Paneer Fried Rice","Rice","Veg",420,6),
  createItem(3,"Chicken Fried Rice","Rice","Non-Veg",480,6),
  createItem(3,"Veg Combi","Rice","Veg",450,6),
  createItem(3,"Non-Veg Combi","Rice","Non-Veg",520,6),
  createItem(3,"Crispy Corn","Starters","Veg",280,5),
  createItem(3,"Honey Chilli Potato","Starters","Veg",320,5),
  createItem(3,"Chilli Paneer","Starters","Veg",380,5),
  createItem(3,"Chilli Chicken","Starters","Non-Veg",420,5),
  createItem(3,"Chicken 65","Starters","Non-Veg",450,5),
  createItem(3,"Chicken Lollipop","Starters","Non-Veg",480,5),
  createItem(3,"Classic French Fries","Sides","Veg",320,6),
  createItem(3,"Peri Peri French Fries","Sides","Veg",350,6),
  createItem(3,"Potato Wedges","Sides","Veg",330,6),
  createItem(3,"Potato & Baked Beans","Sides","Veg",360,6),
  createItem(3,"Chicken Popcorn","Sides","Non-Veg",420,5),
  createItem(3,"Jalapeno Cheese Poppers","Sides","Veg",400,5),
  createItem(3,"Garlic Bread Cheese","Bread","Veg",280,8),
  createItem(3,"Cheese Stuffed Garlic Bread","Bread","Veg",350,8),
  createItem(3,"Paneer Tandoori Stuffed Garlic Bread","Bread","Veg",420,8),
  createItem(3,"Paneer Makhani Stuffed Garlic Bread","Bread","Veg",450,8),
  createItem(3,"Chicken Makhani Stuffed Garlic Bread","Bread","Non-Veg",480,8),
  createItem(3,"Chicken Tandoori Stuffed Garlic Bread","Bread","Non-Veg",500,8),

  createItem(3,"Grilled Veg Sandwich","Sandwich","Veg",320,6),
  createItem(3,"Paneer Makhani Sandwich","Sandwich","Veg",420,6),
  createItem(3,"Paneer Schezwan Cheese Sandwich","Sandwich","Veg",440,6),
  createItem(3,"Chicken Makhani Sandwich","Sandwich","Non-Veg",480,6),
  createItem(3,"Chicken Schezwan Cheese Sandwich","Sandwich","Non-Veg",500,6),
  createItem(3,"Classic Veg Burger","Burger","Veg",300,6),
  createItem(3,"Veg Burger with Cheese","Burger","Veg",360,6),
  createItem(3,"Classic Chicken Burger","Burger","Non-Veg",420,6),
  createItem(3,"Chicken Burger with Cheese","Burger","Non-Veg",480,6),
  createItem(3,"Grilled Chicken Patty Burger","Burger","Non-Veg",450,6),
  createItem(3,"Zinger Paneer Fried Burger","Burger","Veg",470,6),
  createItem(3,"Zinger Fried Chicken Burger","Burger","Non-Veg",520,6),
  createItem(3,"Aloo Schezwan Frankle","Roll","Veg",320,5),
  createItem(3,"Paneer Chilli Frankle","Roll","Veg",380,5),
  createItem(3,"Paneer Schezwan Frankle","Roll","Veg",400,5),
  createItem(3,"Paneer Roll","Roll","Veg",350,5),
  createItem(3,"Veg Kathi Roll","Roll","Veg",330,5),
  createItem(3,"Egg Frankle","Roll","Egg",360,5),
  createItem(3,"Chicken Roll","Roll","Non-Veg",420,5),
  createItem(3,"Chicken Chilli Frankle","Roll","Non-Veg",440,5),
  createItem(3,"Chicken Tikka Roll","Roll","Non-Veg",450,5),
  createItem(3,"Chicken Seekh Wrap","Roll","Non-Veg",480,5),
  createItem(3,"Fried Chicken Twister","Roll","Non-Veg",500,5),
  createItem(3,"Chicken Kathi Roll","Roll","Non-Veg",460,5),

  createItem(3,"Margherita","Pizza","Veg",480,8),
  createItem(3,"Onion Pizza","Pizza","Veg",500,8),
  createItem(3,"Mac n Cheese Pizza","Pizza","Veg",550,8),
  createItem(3,"Corn & Cheese Pizza","Pizza","Veg",520,8),
  createItem(3,"Three Cheese Pizza","Pizza","Veg",580,8),
  createItem(3,"Jalapeno Cheese Pizza","Pizza","Veg",540,8),
  createItem(3,"Farm to Table Pizza","Pizza","Veg",560,8),
  createItem(3,"Paneer Makhani Pizza","Pizza","Veg",620,8),
  createItem(3,"Chicken Makhani Pizza","Pizza","Non-Veg",680,8),
  createItem(3,"Chicken Pepperoni Pizza","Pizza","Non-Veg",700,8),
  createItem(3,"Hot & Spicy Seekh Pizza","Pizza","Non-Veg",720,8),
  createItem(3,"Chicken Loaded Pizza","Pizza","Non-Veg",750,8),
  createItem(3,"Tandoori Paneer Pizza","Pizza","Veg",650,8),
  createItem(3,"Tandoori Chicken Pizza","Pizza","Non-Veg",720,8),

  createItem(3,"Choco Lava Cake","Desserts","Veg",420,12),
  createItem(3,"Blueberry Muffin","Desserts","Veg",320,24),
  createItem(3,"Choco Chip Muffin","Desserts","Veg",340,24),
  createItem(3,"Pastry","Desserts","Veg",300,24),
  createItem(3,"Assorted Pastries","Desserts","Veg",320,24),
  createItem(3,"Pudding","Desserts","Veg",280,12),
  createItem(3,"New York Cheesecake (slice)","Desserts","Veg",450,24),
  createItem(3,"Brownie with Ice Cream","Desserts","Veg",480,8),
  createItem(3,"Brownie","Desserts","Veg",380,24)

];


    const users = [

    {
        restaurant_id: 1,
        restaurantName: "Mayuri Café",
        username: "mayuri",
        password: "123",
        role: "restaurant",
        verified: true,
        latitude: 17.3850,
        longitude: 78.4867,
        menu: mayuriMenu
    },
    {
        restaurant_id: 2,
        restaurantName: "AB Dakshin",
        username: "dakshin",
        password: "123",
        role: "restaurant",
        verified: true,
        latitude: 17.4065,
        longitude: 78.4772,
        menu: dakshinMenu
    },
    {
        restaurant_id: 3,
        restaurantName: "Bistro by Safal",
        username: "bistro",
        password: "123",
        role: "restaurant",
        verified: true,
        latitude: 17.4100,
        longitude: 78.4500,
        menu: bistroMenu
    },

{
  ngoName: "Helping Hands NGO",
  username: "ngo1",
  password: "123",
  role: "ngo",
  verified: true,
  isMock: true,
  smuCapacity: 50,
  latitude: 17.3850,
  longitude: 78.4867
},
{
  ngoName: "Food Rescue NGO",
  username: "ngo2",
  password: "123",
  role: "ngo",
  verified: true,
  isMock: true,
  smuCapacity: 40,
  latitude: 17.3950,
  longitude: 78.4767
}



];



    localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}



function saveRestaurantMenu(username, updatedMenu) {
    let users = getUsers();
    const index = users.findIndex(u => u.username === username);
    if (index !== -1) {
        users[index].menu = updatedMenu;
        saveUsers(users);
          buildSurplusData();

    }
}

function login(username, password) {
    let users = getUsers();
    return users.find(u =>
        u.username === username &&
        u.password === password
    );
}

function buildSurplusData() {

    const users = getUsers();

    const surplus = users
        .filter(u => u.role === "restaurant")
        .map(rest => {

            const availableItems = rest.menu
                .filter(item =>
                    item.quantity > 0 &&
                    item.status === "Published"
                );

            return {
    restaurant: rest.restaurantName,
    latitude: rest.latitude,
    longitude: rest.longitude,
    items: availableItems
};

        })
        .filter(r => r.items.length > 0);

    localStorage.setItem(
        "allSurplus",
        JSON.stringify(surplus)
    );
}

buildSurplusData();

function registerRestaurant(name, username, password) {

  let users = getUsers();

  const exists = users.some(
    u => u.username.toLowerCase() ===
         username.toLowerCase()
  );

  if (exists) {
    alert("Username already exists!");
    return false;
  }

  const newRestaurant = {
    restaurant_id: Date.now(),
    restaurantName: name,
    username: username.trim(),
    password: password,
    role: "restaurant",
    verified: true,
    latitude: 17.40 + Math.random()/10,
    longitude: 78.45 + Math.random()/10,
    menu: []
  };

  users.push(newRestaurant);
  saveUsers(users);

  return true;
}

function removeExpiredFood() {

    let surplus =
        JSON.parse(localStorage.getItem("allSurplus")) || [];

    const now = Date.now();

    surplus.forEach(rest => {

        rest.items = rest.items.filter(item => {

            if (!item.publishedTime)
                return true;

            const expiry =
                item.publishedTime +
                item.shelfLife * 3600000;

            return now < expiry;
        });
    });

    surplus =
        surplus.filter(r => r.items.length > 0);

    localStorage.setItem(
        "allSurplus",
        JSON.stringify(surplus)
    );
}

setInterval(removeExpiredFood, 60000);

function distance(a, b) {

    const dx = a.latitude - b.latitude;
    const dy = a.longitude - b.longitude;

    return Math.sqrt(dx * dx + dy * dy);
}

function sortRestaurantsByDistance(ngo, restaurants) {

    return restaurants.sort(
        (r1, r2) =>
            distance(ngo, r1) -
            distance(ngo, r2)
    );
}
