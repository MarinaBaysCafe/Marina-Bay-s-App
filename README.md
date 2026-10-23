# Marina Bay's Cafe apps: how to use

Copyright (c) 2026 Marina Bay's Cafe. All rights reserved. See the LICENSE file.

Private tools for running the cafe. They work in a web browser and can be added to a phone's home screen. Everything is saved on the device first, so the apps keep working without internet. Sign in on the Sync page to share changes between phones.

Do not share the repository or the web address outside the cafe.

## A normal day

1. **Start a shift** in Shift (or when the POS asks). Enter the starting cash in the drawer.
2. **Take orders** in the POS and press Charge.
3. **Record expenses** in Expenses as they happen.
4. **Count the cash** in the Money counter, then **end the shift** in Shift. Enter the actual cash and who is closing.
5. **Check the day** in the Calendar.

## POS (pos.html)

- Tap items to build an order. Pick the size and add-ons when asked, and choose dine in or take out.
- **Charge**
  - **Discounts:** turn on PWD (20%), Senior Citizen (20%) or Employee (10%). Several can be on at once and they add up. Each can apply to the whole order or to one item. There is also a free ₱ or % field for other discounts.
  - **Payment:** each payment method has its own amount. Cash can be left blank to cover the rest. Press **Rest** next to a method to fill in whatever is still unpaid after the other amounts. Use the Exact, 100, 200, 500 and 1,000 buttons for cash received.
  - Press **Complete sale**. The receipt prints automatically if a printer is set up (turn this off in Settings). **Print again** is on the next screen.
- **Orders** shows today's orders.
  - **Refund:** counts the order as money returned and keeps it in the records.
  - **Correct:** refunds the order and opens a new one with the same items to change.
  - **Delete:** removes the order completely. Only available for orders in the shift that is still open. Use Refund if money was given back.

## Shift (shift.html)

- **Shift** tab: the open shift, its sales so far, and the buttons to start or end it.
- **Ending a shift:** enter the actual cash. The report shows the expected cash, the difference, sales, discounts, refunds, cash and e-wallet totals. The cups and lids used are taken off Inventory automatically.
- **History** tab: every closed shift. Open one to print it, see its day in the Calendar, or **Delete shift**. Deleting asks twice and removes the shift and all of its orders (expenses and the money counter are left alone). It can offer to put the cups and lids back in stock.
- Closed shifts cannot be reopened.

## Inventory (inventory.html)

- **Stock** tab: every item with a count. Use + and − or type the count. Items start as "out of stock" until you count them.
- **Record used or added stock** (at the top): choose **Used** (loss, spoilage, anything not counted from sales) or **Added** (a delivery or restock), search the item, enter the amount and press Done. The stock count changes right away.
- **Daily** tab: the same table as the Calendar. **Item | Beg | Added | Used | End | Units**, grouped by category.
  - Beg is the previous day's End.
  - Added and Used include changes made with + and −, the record form, and cups and lids taken off when a shift ends.
  - To fix a wrong count, recount the item on the Stock tab. A higher count is recorded as Added and a lower one as Used.
  - **Save as .xlsx** makes a spreadsheet with a Month sheet and a sheet for the day you picked.
- Each item has a **Unit** (pcs, box, pack, bottle or your own). Change the list of units in Settings.
- Data tab: back up, restore or reset the stock list.

## Calendar (calendar.html)

- A month grid that opens on today. Teal numbers are net sales and brown numbers are expenses. Tap a day to see its sales, shifts, money counter, expenses, cups and lids from sales, and the inventory table.
- Used / Added can be recorded here for today only. The table and the xlsx button work for any day.

## Settings (settings.html)

- **Auto-print** the receipt after charging.
- **Payment methods:** Cash is always there. Add e-wallets or cards, or rename them. They can be split with cash when charging.
- **Discounts:** add, rename or change the percentages.
- **Inventory units:** the list offered on the Unit field.
- **Reset settings:** puts only these settings back to the defaults. Sales, shifts, menu, inventory and recipes are never touched. **Undo reset** brings the old settings back.

## Printers and receipts (printers.html)

- Add a printer (Bluetooth or USB) and choose it once. It stays paired until you press **Unpair**. Bluetooth printers reconnect by themselves when the POS opens or the link drops.
- Web Bluetooth does not work in iPhone Safari. Use Chrome on Android or a computer.

## Other pages

| Page | What it does |
|---|---|
| `index.html` | Home page with links to everything |
| `money-counter.html` | Daily cash count |
| `expenses.html` | Daily expenses |
| `recipes.html` | Recipes and cost |
| `menu.html` | Menu editor (items, sizes, prices, add-ons) |
| `data.html` | Backup, restore, and start fresh (set everything to zero) |
| `security.html` | PIN lock |
| `sync.html` | Sign in and see the cloud sync status |

## Backups and cloud sync

- Download a backup from **Data** before deleting or resetting anything real. A backup includes sales, shifts, menu, inventory, the daily inventory record, settings, recipes, counts and expenses.
- When signed in on the Sync page, changes are copied to Firebase and shared between phones. This includes the menu, inventory, daily inventory record, settings, recipes, counts, expenses, sales and shifts. Printer settings, the PIN and the open order stay on each phone.
- Resetting in Data also clears the same data on every other signed-in phone.
- If two phones change the same record, the one saved last wins.
- Firestore rules: the new lists use the collections `sync_config` and `sync_invlog`. If your rules only allow certain collections by name, add these two.

## Dates and time

All dates and times use Philippine time (Asia/Manila), whatever the device's own time zone is. The calendar starts on today's Philippine date and moves to the next day at midnight.

## For the person maintaining the code

- The look (colors, fonts, header) lives in `brand.css`. Change the colors at the top and every page follows.
- Starting data lives in `menu-default.js` and `inventory-default.js`. Once something is changed in an app, the app keeps its own copy on that device.
- `pos-config.js` holds the editable settings, `inv-log.js` the daily inventory record and the .xlsx writer, `shift-lib.js` sales and shifts, `cloud.js` the sync.
- When a file changes, raise the version number in `sw.js` so phones load the new files.
