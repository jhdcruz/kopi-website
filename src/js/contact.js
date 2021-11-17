/* eslint-disable no-unused-vars */
function generateTicket() {
  // Dos[;ay ticket on form submit
  let ticket = document.querySelector("#ticket");
  let contact = document.querySelector("#contact-form");
  ticket.style.display = "block";
  contact.style.display = "none";

  // Ticket number generator
  let id = Math.floor(10000 + Math.random() * 90000);
  document.querySelector("#ticket_no").innerHTML = `${id}`;

  // Display form inputs
  const inputName = document.querySelector("#fn").value;
  document.querySelector("#sentName").innerHTML = `${inputName}`;

  const inputEmail = document.querySelector("#email").value;
  document.querySelector("#sentEmail").innerHTML = `${inputEmail}`;

  const categoryNode = document.querySelector("#category");
  const inputCategory = categoryNode.options[categoryNode.selectedIndex].value;
  document.querySelector("#sentCategory").innerHTML = `${inputCategory}`;

  const inputMessage = document.querySelector("#message").value;
  document.querySelector("#sentMessage").innerHTML = `${inputMessage}`;

  return false;
}
