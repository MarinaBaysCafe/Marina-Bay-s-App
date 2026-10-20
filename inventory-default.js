/* Copyright (c) 2026 Marina Bay's Cafe. All rights reserved. */
/* Starting inventory for Marina Bay's Cafe. Every amount starts at zero; count the stock and enter it in the Inventory app.
   This file is only the starting point. Once you change the list inside the app (Inventory),
   the app keeps its own copy on that device and uses that instead.

   Each item: name, group (the heading it is listed under), qty (how many; 0 = out of stock,
   null = not counted yet), unit (optional, like "pcs" or "bottles"), note (optional).
   To add an item by hand, copy one line and change it. Keep every id unique. */
window.MB_DEFAULT_INVENTORY = {
  countedOn: "",
  items: [
    // Cups
    {"id": "12oz-dabba", "name": "12oz dabba", "group": "Cups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "16oz-dabba", "name": "16oz dabba", "group": "Cups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "22oz-dabba", "name": "22oz dabba", "group": "Cups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "12oz-double-wall", "name": "12oz double wall", "group": "Cups", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Lids and straws
    {"id": "dome-lids", "name": "Dome lids", "group": "Lids and straws", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "flat-lids", "name": "Flat lids", "group": "Lids and straws", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "black-lids", "name": "Black lids", "group": "Lids and straws", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "big-straw", "name": "Big straw", "group": "Lids and straws", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "small-straw", "name": "Small straw", "group": "Lids and straws", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Dairy and cream
    {"id": "fresh-milk", "name": "Fresh milk", "group": "Dairy and cream", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "oat-milk", "name": "Oat milk", "group": "Dairy and cream", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "vivo-whipping-cream", "name": "Vivo whipping cream", "group": "Dairy and cream", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "mascarpone-cream", "name": "Mascarpone cream", "group": "Dairy and cream", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "pristine-apc", "name": "Pristine APC", "group": "Dairy and cream", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "condensed-milk", "name": "Condensed milk", "group": "Dairy and cream", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Coffee and bases
    {"id": "beans", "name": "Beans", "group": "Coffee and bases", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "frappe-base", "name": "Frappe base", "group": "Coffee and bases", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "matcha-powder", "name": "Matcha powder", "group": "Coffee and bases", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "sprite", "name": "Sprite", "group": "Coffee and bases", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Syrups
    {"id": "ss-raspberry-syrup", "name": "SS raspberry syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-blueberry-syrup", "name": "SS blueberry syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-strawberry-syrup", "name": "SS strawberry syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-peach-syrup", "name": "SS peach syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-french-vanilla-syrup", "name": "SS french vanilla syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-cane-sugar-syrup", "name": "SS cane sugar syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-white-choco-syrup", "name": "SS white choco syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-caramel-syrup", "name": "SS caramel syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-cherry-syrup", "name": "SS cherry syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-passion-fruit-syrup", "name": "SS passion fruit syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-mixed-berries-syrup", "name": "SS mixed berries syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-pistachio-syrup", "name": "SS pistachio syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-vanilla-syrup", "name": "SS vanilla syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "ss-watermelon-syrup", "name": "SS watermelon syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "davinci-hazelnut", "name": "Davinci Hazelnut", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "davinci-roasted-almond", "name": "Davinci Roasted Almond", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "torani-butterscotch", "name": "Torani Butterscotch", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Sauces
    {"id": "white-chocolate-sauce", "name": "White chocolate sauce", "group": "Sauces", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "chocolate-sauce", "name": "Chocolate sauce", "group": "Sauces", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "caramel-sauce", "name": "Caramel sauce", "group": "Sauces", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "strawberry-sauce", "name": "Strawberry sauce", "group": "Sauces", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Toppings and fruit
    {"id": "lychees-in-can", "name": "Lychees in can", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "strawberries-in-can", "name": "Strawberries in can", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "lady-fingers", "name": "Lady fingers", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "coconut-jelly", "name": "Coconut jelly", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "coffee-jelly", "name": "Coffee jelly", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "milk-chocolate-chips", "name": "Milk chocolate chips", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "white-chocolate-chips", "name": "White chocolate chips", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "dark-chocolate-powder", "name": "Dark chocolate powder", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "oreo-crumbs", "name": "Oreo crumbs", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "biscoff-crumbs", "name": "Biscoff crumbs", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "biscoff-spread", "name": "Biscoff spread", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Milk tea (MT)
    {"id": "wintermelon-syrup-mt", "name": "Wintermelon syrup MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "taro-syrup-mt", "name": "Taro syrup MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "hokkaido-syrup-mt", "name": "Hokkaido syrup MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "okinawa-syrup-mt", "name": "Okinawa syrup MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "brown-sugar-syrup-mt", "name": "Brown sugar syrup MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "strawberry-syrup-mt", "name": "Strawberry syrup MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "dark-choco-powder-mt", "name": "Dark choco powder MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "c-c-powder-mt", "name": "C&C powder MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "milk-essence-powder-mt", "name": "Milk essence powder MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "matcha-powder-mt", "name": "Matcha powder MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "red-velvet-powder-mt", "name": "Red velvet powder MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Fruit tea (FT)
    {"id": "melon-syrup-ft", "name": "Melon syrup FT", "group": "Fruit tea (FT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "green-apple-syrup-ft", "name": "Green apple syrup FT", "group": "Fruit tea (FT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "mango-syrup-ft", "name": "Mango syrup FT", "group": "Fruit tea (FT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "lemon-syrup-ft", "name": "Lemon syrup FT", "group": "Fruit tea (FT)", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Tea extras
    {"id": "cheesecake-base", "name": "Cheesecake base", "group": "Tea extras", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "cream-cheese-powder", "name": "Cream cheese powder", "group": "Tea extras", "qty": 0, "unit": "", "note": "", "updated": ""},
    // Snacks
    {"id": "pringles-102g-sour-cream-onion", "name": "Pringles (102g) sour cream & onion", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "pringles-102g-cheese", "name": "Pringles (102g) cheese", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "pringles-102g-bbq", "name": "Pringles (102g) BBQ", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "pringles-102g-original", "name": "Pringles (102g) original", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "pringles-42g-sour-cream-onion", "name": "Pringles (42g) sour cream & onion", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "pringles-42g-original", "name": "Pringles (42g) original", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "piknik-thick-cut", "name": "Piknik thick cut", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "piknik-original", "name": "Piknik original", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": ""},
    {"id": "piknik-ketchup", "name": "Piknik ketchup", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": ""},
  ]
};
