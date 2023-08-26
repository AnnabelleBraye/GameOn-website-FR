function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalElt = document.querySelector(".modal");
const formData = document.querySelectorAll(".formData");
const formElt = document.querySelector('[name=reserve]');

// launch modal event
addOpenAndCloseEvent(formElt);

// function validate() {
//   const isFirstnameValid = formElt.firstname.value.length >= 2;
//   const isLastnameValid = formElt.lastname.value.length >= 2;
//   const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
//   // return true if email format is like '###@###.##'
//   const isEmailValid = regexMail.test(formElt.email.value)
//   const qtyValue = formElt.quantity.value;
//   // return true if qty is empty or if it's a number between 0 and 99
//   const isQtyValid = !qtyValue || (qtyValue && !isNaN(qtyValue) && qtyValue >= 0 && qtyValue < 100)
//   const birthdateTime = new Date(formElt.birthdate.value).getTime();
//   const todayTime = new Date().getTime();
//   const isBirthdateValid = birthdateTime <= todayTime;
//   // returns true if one radio button is checked
//   const isRadioValid = Array.from(formElt.location).find(x => x.checked) !== undefined;
//   const isCheckboxValid = formElt.checkbox1.checked;
  
//   manageFieldValidity(firstnameElement, 'Le prénom doit faire au moins 2 caractères.');
//   manageFieldValidity(formElt.firstname, isFirstnameValid(), 'Le prénom doit faire au moins 2 caractères.');
//   manageFieldValidity(formElt.lastname, isLastnameValid, 'Le nom doit faire au moins 2 caractères.');
//   manageFieldValidity(formElt.email, isEmailValid, 'Veuillez saisir une adresse email valide.');
//   manageFieldValidity(formElt.quantity, isQtyValid, 'La quantité doit être comprise entre 0 et 99.');
//   manageFieldValidity(formElt.birthdate, isBirthdateValid, 'La date de naissance ne peut pas être supérieure à la date du jour.');
//   manageFieldValidity(formElt.location[0], isRadioValid, 'Veuillez choisir un tournoi.');
//   manageFieldValidity(formElt.checkbox1, isCheckboxValid, 'Vous devez avoir lu et accepté les conditions d\'utilisation.');

//   try {
//     if (firstnameElement.condition && isLastnameValid && isEmailValid && isQtyValid
//     && isBirthdateValid && isRadioValid && isCheckboxValid) {
//       formElt.submit();
//     }
//     return false;
//   } catch (err) {
//     alert(err);
//   }
// }

/**
 * Check the condition to validate a field and show or hide error
 * @param {*} element element for which we will show or hide error
 * @param {*} condition condition to show or hide error
 * @param {*} errorMsg Error message to show
 */
// function manageFieldValidity(element, condition, errorMsg) {
//   if (!condition()) {
//     element.parentElement.setAttribute('data-error', errorMsg);
//     element.parentElement.setAttribute('data-error-visible', true);
//   } else {
//     element.parentElement.setAttribute('data-error-visible', false);
//   }
// }

// Check on submit
function validate() {
  const firstnameElement = {
    elementName: formElt.firstname,
    condition: this.isFirstnameValid,
    errorMsg: 'Le prénom doit faire au moins 2 caractères.'
  }
  const lastnameElement = {
    elementName: formElt.lastname,
    condition: this.isLastnameValid,
    errorMsg: 'Le nom doit faire au moins 2 caractères.'
  }
  const emailElement = {
    elementName: formElt.email,
    condition: this.isEmailValid,
    errorMsg: 'Veuillez saisir une adresse email valide.'
  }
  const birthdateElement = {
    elementName: formElt.birthdate,
    condition: this.isBirthdateValid,
    errorMsg: 'La date de naissance ne peut pas être supérieure à la date du jour.'
  }
  const qtyElement = {
    elementName: formElt.quantity,
    condition: this.isQtyValid,
    errorMsg: 'La quantité doit être comprise entre 0 et 99.'
  }
  const radioElement = {
    elementName: Array.from(formElt.location),
    condition: this.isRadioValid,
    errorMsg: 'Veuillez choisir un tournoi.'
  }
  const checkboxElement = {
    elementName: formElt.checkbox1,
    condition: this.isCheckboxValid,
    errorMsg: 'Vous devez avoir lu et accepté les conditions d\'utilisation.'
  }

  try {
    const firstnameIsValid = manageFieldValidity(firstnameElement);
    const lastnameIsValid = manageFieldValidity(lastnameElement);
    const emailIsValid = manageFieldValidity(emailElement);
    const birthdateIsValid = manageFieldValidity(birthdateElement);
    const qtyIsValid = manageFieldValidity(qtyElement);
    const radioIsValid = manageFieldValidity(radioElement);
    const checkboxIsValid = manageFieldValidity(checkboxElement);

    if (firstnameIsValid && lastnameIsValid && emailIsValid && birthdateIsValid
    && qtyIsValid && radioIsValid && checkboxIsValid) {
      formElt.submit();
    }
    return false;
  } catch (err) {
    alert(err);
  }
}

/**
 * Add a input event on every fields to hide error if condition is valid
 * @param {*} element Contains elementName and condition to show/hide error
 */
function addFieldsEvent(element) {
  // Radiobutton case
  if (Array.isArray(element.elementName)) {
    element.elementName.forEach(subElt => {
      addInputListeners(subElt, element);
    })
  } else {
    addInputListeners(element.elementName, element);
  }
}

/**
 * Check the condition to validate a field and show or hide error
 * @param {*} element Contains elementName and condition to show/hide error
 * @param {*} errorMsg Error message to show
 * @returns boolean, false if condition is invalid, else true
 */
function manageFieldValidity(element) {
  let elt = element.elementName;
  // Radiobutton case
  if (Array.isArray(element.elementName)) {
    elt = element.elementName[0]
  }

  if (!element.condition()) {
    addFieldsEvent(element);
    elt.parentElement.setAttribute('data-error', element.errorMsg);
    elt.parentElement.setAttribute('data-error-visible', true);
    return false
  } else {
    elt.parentElement.setAttribute('data-error-visible', false);
    return true
  }
}

function isFirstnameValid() {
  return this.elementName.value.length >= 2;
}
function isLastnameValid() {
  return this.elementName.value.length >= 2;
}
function isEmailValid() {
  const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  // return true if email format is like '###@###.##'
  return regexMail.test(this.elementName.value)
}
function isQtyValid() {
  const qtyValue = this.elementName.value;
  // returns true if qty is empty or if it's a number between 0 and 99
  return !qtyValue || (qtyValue && !isNaN(qtyValue) && qtyValue >= 0 && qtyValue < 100)
}
function isBirthdateValid() {
  const birthdateTime = new Date(this.elementName.value).getTime();
  const todayTime = new Date().getTime();
  return birthdateTime <= todayTime;
}
function isRadioValid() {
  return this.elementName.find(x => x.checked) !== undefined;
}
function isCheckboxValid() {
  return this.elementName.checked
}