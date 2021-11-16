// --------------------- SHORTHANDS ------------------------
const d = document;

// --------------------- VARIABLES -------------------------
const black = 15.0;
const iced = 70.0;
const latte = 50.0;
const macchiato = 60.0;
const capuccino = 60.0;

// --------------------- GENERATORS ------------------------

// Order ID Generator
let id = Math.floor(100000000 + Math.random() * 900000000);
let receipt_id = (d.querySelector("#order_id").innerHTML = id);

// --------------------- SELECTORS -------------------------

// Form
const nameInput = d.querySelector("#fn");
const phoneInput = d.querySelector("#phone");

// Menu
const itemBlack = d.querySelector("#black-data");
const itemIced = d.querySelector("#iced-data");
const itemLatte = d.querySelector("#latte-data");
const itemMacchiato = d.querySelector("#macchiato-data");
const itemCapuccino = d.querySelector("#capuccino-data");

// TODO: Rewrite to array
const blackQty = d.querySelector("#black");
const icedQty = d.querySelector("#iced");
const latteQty = d.querySelector("#latte");
const macchiatoQty = d.querySelector("#macchiato");
const capuccinoQty = d.querySelector("#capuccino");

let qtyInput = d.querySelectorAll(".qty");

// Total
const vatTotal = d.querySelector("#vat");
const total = d.querySelector("#total");

// ------------------ EVENT LISTENERS -----------------------

nameInput.addEventListener("input", syncInputs, false);
phoneInput.addEventListener("input", syncInputs, false);

qtyInput.forEach((item) => {
  item.addEventListener("input", computeTotal, false);
});

// --------------------- FUNCTIONS --------------------------

// Sync form input values to receipt
function syncInputs() {
  let nameValue = nameInput.value;
  let phoneValue = phoneInput.value;

  d.querySelector("#c_name").innerHTML = nameValue;
  d.querySelector("#c_phone").innerHTML = phoneValue;
}

// Sync qty. value to item's total price
function computeTotal() {
  // TODO: Rewrite to utilize array
  // Menu Items
  let blackValue = black * blackQty.value;
  let icedValue = iced * icedQty.value;
  let latteValue = latte * latteQty.value;
  let macchiatoValue = macchiato * macchiatoQty.value;
  let capuccinoValue = capuccino * capuccinoQty.value;

  // Total
  let totalValue =
    blackValue + icedValue + latteValue + macchiatoValue + capuccinoValue;
  let vatValue = totalValue * 0.12 - totalValue + totalValue;

  d.querySelector("#p-black").innerHTML = blackValue.toFixed(2);
  d.querySelector("#p-iced").innerHTML = icedValue.toFixed(2);
  d.querySelector("#p-latte").innerHTML = latteValue.toFixed(2);
  d.querySelector("#p-macchiato").innerHTML = macchiatoValue.toFixed(2);
  d.querySelector("#p-capuccino").innerHTML = capuccinoValue.toFixed(2);

  // Display Total
  vatTotal.innerHTML = vatValue.toFixed(2);
  total.innerHTML = totalValue.toFixed(2);
}

// get current date and time from the browser
function getDateTime() {
  const date = new Date();

  d.querySelector("#date-issued").innerHTML = date.toUTCString();
}

// remove items with 0 qty.
function pruneOrders() {
  if (blackQty.value === "0") {
    itemBlack.remove();
  }
  if (icedQty.value === "0") {
    itemIced.remove();
  }
  if (latteQty.value === "0") {
    itemLatte.remove();
  }
  if (macchiatoQty.value === "0") {
    itemMacchiato.remove();
  }
  if (capuccinoQty.value === "0") {
    itemCapuccino.remove();
  }
}

// eslint-disable-next-line no-unused-vars
function printReceipt(e) {
  getDateTime();

  pruneOrders();

  // Barcode Generator
  JsBarcode("#barcode", `${receipt_id}`, {
    format: "code128",
    lineColor: "#000",
    width: 2,
    height: 20,
    displayValue: false,
  });

  window.print();
}
