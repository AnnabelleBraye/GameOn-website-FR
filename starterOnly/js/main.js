function editNav() {
  var navElt = document.getElementById('appNav');
  if (navElt.className === 'topnav') {
    navElt.classList.add('responsive');
  } else {
    navElt.className = 'topnav';
  }
}

// Launch editNav event
addBurgerButtonEvent(editNav);
// Add event on click on menu
addOnClickMenuEvent();