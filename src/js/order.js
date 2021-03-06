// --------------------- SHORTHANDS ------------------------
const d = document;

// --------------------- VARIABLES -------------------------
const black = 15.0;
const iced = 70.0;
const latte = 50.0;
const macchiato = 60.0;
const cappuccino = 60.0;

// --------------------- GENERATORS ------------------------

// Order ID Generator
let id = Math.floor(100000000 + Math.random() * 900000000);
d.querySelector("#order_id").innerHTML = `${id}`;

// --------------------- SELECTORS -------------------------

// Form
const nameInput = d.querySelector("#fn");
const phoneInput = d.querySelector("#phone");

const paymentInput = d.querySelectorAll(".payment_method");

const blackQty = d.querySelector("#black");
const icedQty = d.querySelector("#iced");
const latteQty = d.querySelector("#latte");
const macchiatoQty = d.querySelector("#macchiato");
const cappuccinoQty = d.querySelector("#cappuccino");

let qtyInput = d.querySelectorAll(".qty");

// Total
const vatTotal = d.querySelector("#vat");
const total = d.querySelector("#total");

// ------------------ EVENT LISTENERS -----------------------

nameInput.addEventListener("input", syncInputs, false);
phoneInput.addEventListener("input", syncInputs, false);

paymentInput.forEach((pm) => {
  pm.addEventListener("change", syncInputs, false);
});

qtyInput.forEach((item) => {
  item.addEventListener("input", computeTotal, false);
});

// --------------------- FUNCTIONS --------------------------

// Sync form input values to receipt
function syncInputs() {
  let nameValue = nameInput.value;
  let phoneValue = phoneInput.value;

  paymentInput.forEach((method) => {
    if (method.checked) {
      // select parent of the parent node.
      d.querySelector("#paymentM").innerHTML = `${method.value}`;
    }
  });

  d.querySelector("#c_name").innerHTML = nameValue;
  d.querySelector("#c_phone").innerHTML = phoneValue;
}

// Sync qty. value to item's total price
function computeTotal() {
  // TODO: Utilize array?
  // Menu Items
  let blackValue = black * blackQty.value;
  let icedValue = iced * icedQty.value;
  let latteValue = latte * latteQty.value;
  let macchiatoValue = macchiato * macchiatoQty.value;
  let cappuccinoValue = cappuccino * cappuccinoQty.value;

  // Total
  let totalValue =
    blackValue + icedValue + latteValue + macchiatoValue + cappuccinoValue;
  let vatValue = totalValue * 0.12 - totalValue + totalValue;

  d.querySelector("#p-black").innerHTML = blackValue.toFixed(2);
  d.querySelector("#p-iced").innerHTML = icedValue.toFixed(2);
  d.querySelector("#p-latte").innerHTML = latteValue.toFixed(2);
  d.querySelector("#p-macchiato").innerHTML = macchiatoValue.toFixed(2);
  d.querySelector("#p-cappuccino").innerHTML = cappuccinoValue.toFixed(2);

  // Display Total
  vatTotal.innerHTML = vatValue.toFixed(2);
  total.innerHTML = totalValue.toFixed(2);
}

// get current date and time from the browser
function getDateTime() {
  const date = new Date();

  d.querySelector("#date-issued").innerHTML = date.toUTCString();
}

// eslint-disable-next-line no-unused-vars
function printReceipt() {
  // check for 1 order and no more than 10 in qty.
  const orderValidate = [...qtyInput].some(
    (qty) => parseInt(qty.value) !== 0 && parseInt(qty.value) <= 10
  );

  if (orderValidate === true) {
    getDateTime();

    // remove items with 0 qty.
    qtyInput.forEach((item) => {
      if (item.value === "0") {
        // select parent of the parent node.
        item.parentNode.parentNode.remove();
      }

      // Prevent qty change when cancelled illegally (esc)
      item.style.border = "none";
    });

    // Generate barcode
    JsBarcode("#barcode", `${id}`, {
      format: "code128",
      lineColor: "#000",
      width: 2,
      height: 20,
      displayValue: false,
    });

    // print receipt under #printarea
    // refer to order.scss @media print {...}
    window.print();
  } else {
    alert(
      "Order not valid.\nThere should be at least 1 order and maximum of 10 qty."
    );
  }
}
