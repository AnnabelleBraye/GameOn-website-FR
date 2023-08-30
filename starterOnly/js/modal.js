const modalElt = document.querySelector(".modal");
const formData = document.querySelectorAll(".formData");
const formElt = document.querySelector('[name=form]');

// launch modal event
addOpenAndCloseEvent(openModal, closeModal);
// add onSubmit event
addOnSubmitEvent(validate);

// Check on submit
function validate(e) {
  e.preventDefault();
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
    errorMsg: 'Vous devez saisir une date de naissance valide et cohérente.'
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
      showConfirmationMsg();
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

  addFieldsEvent(element);
  if (!element.condition()) {
    elt.parentElement.setAttribute('data-error', element.errorMsg);
    elt.parentElement.setAttribute('data-error-visible', true);
    return false
  } else {
    elt.parentElement.setAttribute('data-error-visible', false);
    return true
  }
}

function isFirstnameValid() {
  const val = this.elementName.value.trim();
  const letterRegex = /^[a-zA-Z]+[ \-']?[a-zA-Z]+$/
  return val.length >= 2 && letterRegex.test(val);
}
function isLastnameValid() {
  const val = this.elementName.value.trim();
  const letterRegex = /^[a-zA-Z]+[ \-']?[a-zA-Z]+$/
  return val.length >= 2 && letterRegex;
}
function isEmailValid() {
  const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  // return true if email format is like '###@###.##'
  return regexMail.test(this.elementName.value.trim())
}
function isQtyValid() {
  const qtyValue = this.elementName.value;
  // returns true if it's a number between 0 and 99
  return qtyValue && !isNaN(qtyValue) && qtyValue >= 0 && qtyValue < 100
}
function isBirthdateValid() {
  const today = new Date();
  const todayTime = today.getTime();
  const todayYear = today.getFullYear();
  const birthdateDate = new Date(this.elementName.value);
  const birthdateTime = birthdateDate.getTime();
  const birthdateYear = birthdateDate.getFullYear();
  const [minAge, maxAge] = [6, 120];

  return birthdateTime <= todayTime
  && todayYear - birthdateYear <= maxAge 
  && todayYear - birthdateYear >= minAge;
}
function isRadioValid() {
  return this.elementName.find(x => x.checked) !== undefined;
}
function isCheckboxValid() {
  return this.elementName.checked
}

/**
 * Open modal form and handle hidden on modal content and modal confirm-msg
 * Reset form data
 */
function openModal() {
  modalElt.classList.remove('hidden')  
  document.querySelector('.content').classList.remove('hidden');
  document.querySelector('.confirm-msg').classList.add('hidden');
  document.querySelector('.confirm-msg').classList.remove('flex');
  resetData();
}

/**
 * Close modal form
 */
function closeModal() {
  modalElt.classList.add('hidden');
  // formElt.submit();
}

/**
 * Reset all form data and dataset after closing page
 * @param {*} formElt
 */
function resetData() {
  formElt.firstname.value = '';
  formElt.lastname.value = '';
  formElt.email.value = '';
  formElt.birthdate.value = '';
  formElt.quantity.value = '';
  formElt.location.forEach((loc) => {
    loc.checked = false;
  })
  formElt.checkbox1.checked = false;

  document.querySelectorAll('.formData').forEach(elt => {
    delete elt.dataset.error;
    delete elt.dataset.errorVisible;
  })
}

/**
 * Show confirmation Message on submit and hide modal content element
 */
function showConfirmationMsg() {  
  document.querySelector('.content').classList.add('hidden');
  const confirmMsgElt = document.querySelector('div.confirm-msg');
  confirmMsgElt.classList.remove('hidden');
  confirmMsgElt.classList.add('flex');
  confirmMsgElt.querySelector('.thanks').textContent += `, ${formElt.firstname.value}`;

  addEventsOnConfirmationModal(closeModal);
}