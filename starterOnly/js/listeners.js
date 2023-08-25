// function addListeners(subElt, element) {
//   // subElt.addEventListener('input', function() {
//   //   element.condition()
//   // })

//   let elt = element.elementName;
//   let event = 'blur';
//   if (Array.isArray(element.elementName)) {
//     elt = element.elementName[0];
//     event = 'change';
//   }
//   subElt.addEventListener(event, () => {
//     if (element.condition()) {
//       elt.parentElement.setAttribute('data-error-visible', false);
//     } else {
//       elt.parentElement.setAttribute('data-error-visible', true);
//     }
//   })
// }

function addInputListener(elementName, element) {
  elementName.addEventListener('input', () => {
    checkCondition(element, elementName);
  })
}

function addBlurListener(elementName, element) {
  elementName.addEventListener('blur', () => {
    checkCondition(element, elementName);
  })
}

function addChangeListener(subElt, element) {
  subElt.addEventListener('change', () => {
    checkCondition(element, subElt);
  })
}

function checkCondition(element, elementName) {
  if (element.condition()) {
    elementName.parentElement.setAttribute('data-error-visible', false);
  } else {
    elementName.parentElement.setAttribute('data-error-visible', true);
  }
}