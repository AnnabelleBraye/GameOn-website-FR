function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const formElt = document.querySelector('[name=reserve]');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Check on submit
function validate() {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  const firstnameOk = formElt.firstname.value.length >= 2;
  
  const lastnameOk = formElt.lastname.value.length >= 2;

  const emailOk = regex.test(formElt.email.value)
  
  const qtyValue = formElt.quantity.value;
  const qtyOk = !qtyValue || (qtyValue && !isNaN(qtyValue) && qtyValue > 0)

  const radioOk = Array.from(formElt.location).find(x => x.checked) !== undefined

  const conditionsOk = formElt.checkbox1.checked

  if (firstnameOk && lastnameOk && emailOk && qtyOk && radioOk && conditionsOk) {
    return true
  } else {
    console.log(`Les champs ne sont pas correctement remplis`);
    return false;
  }
}



