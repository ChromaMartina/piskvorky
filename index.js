'use strickt';

let player = 'circle';

const poleElements = document.querySelectorAll('.pole');

poleElements.forEach((poleElement, i) => {
  poleElement.addEventListener('click', () => {
    if (player === 'circle') {
      poleElement.classList.add('pole--circle');
      player = 'cross';
      isWinningMove(poleElement);
      if (isWinningMove(poleElement) === true) {
        setTimeout(() => {
          confirm('Vyhrál kroužek. Spustit novou hru?');
          window.location.reload();
        }, 150);
      }
    } else {
      poleElement.classList.add('pole--cross');
      player = 'circle';
      isWinningMove(poleElement);
      if (isWinningMove(poleElement) === true) {
        setTimeout(() => {
          confirm('Vyhrál křížek. Spustit novou hru?');
          window.location.reload();
        }, 150);
      }
    }
    poleElement.setAttribute('tabindex', -1);

    poleElement.disabled = true;
    symbolHrac();
  });
});

const symbolHrac = () => {
  const symbolHracElement = document.querySelector('.imgHra');

  symbolHracElement.classList.remove('imgHra--circle');
  symbolHracElement.classList.remove('imgHra--cross');
  symbolHracElement.classList.add(`imgHra--${player}`);
};

const hraciPole = 10;

const polohaPole = (poleElement) => {
  let poleIndex = 0;
  while (poleIndex < poleElements.length) {
    if (poleElement === poleElements[poleIndex]) {
      break;
    }
    poleIndex++;
  }
  return {
    row: Math.floor(poleIndex / hraciPole),
    column: poleIndex % hraciPole,
  };
};

const najdiPole = (row, column) => poleElements[row * hraciPole + column];

const symbolDoPole = (poleElement) => {
  if (poleElement.classList.contains('pole--circle')) {
    return 'circle';
  } else if (poleElement.classList.contains('pole--cross')) {
    return 'cross';
  }
};

const vyherniSymboly = 5;
const isWinningMove = (poleElement) => {
  const origin = polohaPole(poleElement);
  const symbol = symbolDoPole(poleElement);

  let i;

  let inRow = 1; //radky

  i = origin.column;
  while (i > 0 && symbol === symbolDoPole(najdiPole(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  i = origin.column;
  while (
    i < hraciPole - 1 &&
    symbol === symbolDoPole(najdiPole(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= vyherniSymboly) {
    return true;
  }

  let inColumn = 1; //sloupce

  i = origin.row;
  while (i > 0 && symbol === symbolDoPole(najdiPole(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  i = origin.row;
  while (
    i < hraciPole - 1 &&
    symbol === symbolDoPole(najdiPole(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= vyherniSymboly) {
    return true;
  }

  return false;
};
