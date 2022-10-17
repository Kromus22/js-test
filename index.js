const ONE_SIDE_PRICE = 700;
const TWO_SIDE_PRICE = 1200;
const MINUTES_IN_HOUR = 60;
const TRAVEL_TIME = 50;
const ticketsCount = document.getElementById('num');
const route = document.getElementById('route');
const firstSide = document.getElementById('time-one');
const secondSide = document.getElementById('time-two');
const secondSideBlock = document.querySelector('.second-select');
const form = document.querySelector('.form');
const optionsFirstArr = Array.from(firstSide.options);
const optionsSecondArr = Array.from(secondSide.options);


// показ нужных селектов

route.addEventListener('change', () => {
  const checkSides = route.value !== 'из A в B и обратно в А' ? 'none' : 'block';
  secondSideBlock.style.display = checkSides;

  const checkRoute = (typeRoute) => {
    switch (typeRoute) {
      case 'из A в B': {
        optionsFirstArr.forEach(item => {
          if (item.value.includes('из B в A')) {
            firstSide.selectedIndex = 0;
            item.setAttribute('style', 'display:none;');
          } else {
            item.setAttribute('style', 'display:block;');
          }
        });
        break;
      };
      case 'из B в A': {
        optionsFirstArr.forEach(item => {
          if (item.value.includes('из A в B')) {
            firstSide.selectedIndex = 6;
            item.setAttribute('style', 'display:none;');
          } else {
            item.setAttribute('style', 'display:block;');
          }
        });
        break;
      };
      case 'из A в B и обратно в А': {
        optionsFirstArr.forEach(item => {
          if (item.value.includes('из B в A')) {
            firstSide.selectedIndex = 0;
            item.setAttribute('style', 'display:none;');
          } else {
            item.setAttribute('style', 'display:block;');
          }
        });
        break;
      };
    }
  }
  checkRoute(route.value);
});

// поездка туда и обратно

firstSide.addEventListener('change', () => {
  const hoursStart = +firstSide.value.substr(0, 2);
  const minutesStart = +firstSide.value.substr(3, 2);
  const aTime = hoursStart * 60 + minutesStart;



  optionsSecondArr.forEach((item => {
    const hoursEnd = +item.value.substr(0, 2);
    const minutesEnd = +item.value.substr(3, 2);
    const bTime = hoursEnd * 60 + minutesEnd;
    if (bTime < aTime + TRAVEL_TIME) {
      secondSide.selectedIndex = 0;
      item.setAttribute('style', 'display:none;');
    } else {
      item.setAttribute('style', 'display:block;');
    }
  }));
});
