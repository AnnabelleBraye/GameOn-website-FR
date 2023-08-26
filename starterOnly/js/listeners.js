/**
 * Add an event on input on form fields
 * @param {*} elementName input sur lequel on souhaite ajouter un listener
 * @param {*} element Objet element contenant les propriétés elementName, condition et errorMsg
 */
function addInputListeners(elementName, element) {
  elementName.addEventListener('input', () => checkCondition(element, elementName));
}

/**
 * Vérifie que la condition est valide après event sur l'input
 * @param {*} element Objet element contenant les propriétés elementName, condition et errorMsg
 * @param {*} elementName input sur lequel on a ajouté un listener
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
function addOpenAndCloseEvent(formElt, openModal, closeModal) {
  const openModalBtn = document.querySelectorAll(".modal-btn");
  const closeModalBtn = document.querySelector(".close");

  openModalBtn.forEach((btn) => btn.addEventListener("click", openModal));
  closeModalBtn.addEventListener('click', closeModal);
}

function addCloseToastListener(divElt) {
  divElt.addEventListener('click', function() {
    divElt.className = 'hidden';
  })
}