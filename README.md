# Marina Bay's Cafe apps

Copyright (c) 2026 Marina Bay's Cafe. All rights reserved. See the LICENSE file.

Private tools for running the cafe. They run in a web browser and can be added to a phone's home screen.

| Page | What it does |
|---|---|
| `index.html` | Home page with links to everything |
| `pos.html` | Point of sale: take orders, charge (cash or e-wallet), print receipts |
| `calendar.html` | Every day in one place: sales, shifts, counts, expenses, cups and lids |
| `data.html` | Backup, restore, and start fresh (set everything to zero) |
| `shift.html` | Start and end a shift, sales list, shift report with expenses, cups and lids |
| `money-counter.html` | Daily cash count |
| `expenses.html` | Daily expenses |
| `inventory.html` | Stock list |
| `recipes.html` | Recipes and cost |
| `menu.html` | Menu editor (items, sizes, prices, add-ons) |
| `printers.html` | Receipt printers and receipt layout |
| `security.html` | PIN lock |
| `sync.html` | Sign in and sync status for the cloud (Firebase) |

The look (colors, fonts, header) lives in `brand.css`. Change the colors at the top of that file and every page follows.

Starting data lives in `menu-default.js` and `inventory-default.js`. Once something is changed inside an app, the app keeps its own copy on that device.

Records are saved in the browser of the device in use first. When signed in on the Sync page, changes are also copied to Firebase and shared between phones. Use each app's backup button to keep a copy.

Do not share the repository or the web address outside the cafe.
