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
    errorMsg: 'Vous devez saisir une date de naissance valide.'
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
      closeModal();
      showConfirmationMsg(bodyElt);
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
    // if (!element.condition()) {
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
  // returns true if it's a number between 0 and 99
  return qtyValue && !isNaN(qtyValue) && qtyValue >= 0 && qtyValue < 100
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

/**
 * Open modal form
 */
function openModal() {
  modalElt.classList.remove('hidden');
  resetData();
}

/**
 * Close modal form
 */
function closeModal() {
  modalElt.classList.add('hidden');
}

/**
 * Reset all form data after closing page
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
}

function showConfirmationMsg(bodyElt) {
  const divElt = document.createElement('div');
  divElt.classList.add('confirm-toast');
  divElt.innerHTML = `<span>
    <i class="fa-regular fa-2xl fa-check-circle"></i>
  </span>
  <div class="bold">
    Merci, ${formElt.firstname.value} ! Votre réservation a été reçue.
  </div>
  <span>
    <i class="fa-solid fa-xmark"></i>
  </span>`

  addCloseToastListener(divElt);
  bodyElt.appendChild(divElt)
}