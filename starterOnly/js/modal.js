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

  const isFirstnameValid = formElt.firstname.value.length >= 2;
  
  const isLastnameValid = formElt.lastname.value.length >= 2;

  const isEmailValid = regex.test(formElt.email.value)
  
  const qtyValue = formElt.quantity.value;
  const isQtyValid = !qtyValue || (qtyValue && !isNaN(qtyValue) && qtyValue >= 0 && qtyValue < 100)

  const birthdateTime = new Date(formElt.birthdate.value).getTime();
  const todayTime = new Date().getTime();
  let isBirthdateValid = false;
  if (birthdateTime <= todayTime) {
    isBirthdateValid = true;
  }
  
  const isRadioValid = Array.from(formElt.location).find(x => x.checked) !== undefined;

  const isCheckboxValid = formElt.checkbox1.checked;

  if (isFirstnameValid && isLastnameValid && isEmailValid && isQtyValid && isBirthdateValid && isRadioValid && isCheckboxValid) {
    return true
  } else {
    console.log(`Les champs ne sont pas correctement remplis`);
    return false;
  }
}



