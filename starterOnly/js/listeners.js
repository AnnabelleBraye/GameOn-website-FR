/**
 * Add an onClick event on the burger mennu
 * @param {*} editNav Function which allow to modify appNav classes
 */
function addBurgerButtonEvent(editNav) {
  const burgerButton = document.getElementById('burger');
  burgerButton.addEventListener('click', editNav);
}

/**
 * Function which allow to manage active classes on nav links
 */
function addOnClickMenuEvent() {
  const menuLinksElts = document.querySelectorAll('.links a');
  menuLinksElts.forEach((elt, i, list) => {
    elt.addEventListener('click', () => {
      if (!elt.classList.contains('active')) {
        const previous_active = Array.from(list).find(el => el.classList.contains('active'));
        previous_active.classList.remove('active');
        elt.classList.add('active');
      }
    });
  })
}

/**
 * Add an event listener on form submit
 * @param {*} validate Function to validate form
 */
function addOnSubmitEvent(validate) {
  const formElt = document.querySelector('[name=form]');
  formElt.addEventListener('submit', (e) => validate(e));
}

/**
 * Add an event on input on form fields
 * @param {*} elementName Input on which we want to add a listener
 * @param {*} element Object which contains elementName, condition and errorMsg properties
 */
function addInputListeners(elementName, element) {
  elementName.addEventListener('input', () => checkCondition(element, elementName));
}

/**
 * Check if the condition is valid after input event
 * @param {*} element Object which contains elementName, condition and errorMsg properties
 * @param {*} elementName nput on which we have added a listener
 */
function checkCondition(element, elementName) {
  if (element.condition()) {
    elementName.parentElement.setAttribute('data-error-visible', false);
  } else {
    elementName.parentElement.setAttribute('data-error-visible', true);
  }
}

/**
 * Create open and close modal events
 * @param {*} formElt 
 */
function addOpenAndCloseEvent(openModal, closeModal) {
  const openModalBtn = document.querySelectorAll(".modal-btn");
  const closeModalBtn = document.querySelector(".close");

  openModalBtn.forEach((btn) => btn.addEventListener("click", openModal));
  closeModalBtn.addEventListener('click', closeModal);
}

/**
 * Call closeModal function on click
 * @param {*} closeModal 
 */
function addEventsOnConfirmationModal(closeModal) {
  document.querySelector('.confirm-msg .btn-submit').addEventListener('click', closeModal);
  document.querySelector('.confirm-msg .close-confirm-container').addEventListener('click', closeModal); 
}