'use strickt';

let player = 'circle';

const poleElements = document.querySelectorAll('.pole');

poleElements.forEach((poleElement, i) => {
  poleElement.addEventListener('click', () => {
    if (symbolDoPole(poleElement)) {
      return;
    }

    if (player === 'circle') {
      poleElement.classList.add('pole--circle');
      player = 'cross';
    } else {
      poleElement.classList.add('pole--cross');
      player = 'circle';
    }
    poleElement.setAttribute('tabindex', -1);

    poleElement.disabled = true;
    symbolHrac();
  });
});

function symbolHrac() {
  const symbolHracElement = document.querySelector('.imgHra');

  symbolHracElement.classList.remove('imgHra--circle');
  symbolHracElement.classList.remove('imgHra--cross');
  symbolHracElement.classList.add(`imgHra--${player}`);
}

function symbolDoPole(poleElement) {
  if (poleElement.classList.contains('pole--circle')) {
    return 'circle';
  } else if (poleElement.classList.contains('pole--cross')) {
    return 'cross';
  }
}
