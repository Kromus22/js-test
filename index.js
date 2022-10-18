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
const button = document.querySelector('.button');
const ticketsNum = document.getElementById('num');
const selects = document.querySelector('.selects');
const result = document.querySelector('.result');

// склонение числительных
const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
  0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];


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

// цена 

const getTotal = () => {
  let price = 0;
  if (route.value !== 'из A в B и обратно в А') {
    price = +ticketsNum.value * ONE_SIDE_PRICE;
  } else {
    price = +ticketsNum.value * TWO_SIDE_PRICE;
  }
  return price;
};

// расчёт времени в пути

const getTotalTravelTime = () => {

  const hoursStart = +firstSide.value.substr(0, 2);
  const minutesStart = +firstSide.value.substr(3, 2);
  const aTime = hoursStart * 60 + minutesStart;
  const hoursEnd = +secondSide.value.substr(0, 2);
  const minutesEnd = +secondSide.value.substr(3, 2);
  const bTime = hoursEnd * 60 + minutesEnd;
  let time = 0;
  let travelEndHours = 0;
  let travelEndMinutes = 0;

  if (route.value !== 'из A в B и обратно в А') {
    time = TRAVEL_TIME;
    travelEndHours = Math.floor((aTime + TRAVEL_TIME) / MINUTES_IN_HOUR);
    travelEndMinutes = (aTime + TRAVEL_TIME) - travelEndHours * MINUTES_IN_HOUR;
  } else {
    time = bTime - aTime + TRAVEL_TIME;
    travelEndHours = Math.floor((bTime + TRAVEL_TIME) / MINUTES_IN_HOUR);
    travelEndMinutes = (bTime + TRAVEL_TIME) - travelEndHours * MINUTES_IN_HOUR;
  }

  return { time, travelEndHours, travelEndMinutes };
};

// вывод инфы

button.addEventListener('click', () => {

  const { time, travelEndHours, travelEndMinutes } = getTotalTravelTime();
  result.innerHTML = `
    <p>Вы выбрали ${ticketsNum.value} ${declOfNum(ticketsNum.value, ['билет', 'билета', 'билетов'])} по маршруту ${route.value} стоимостью ${getTotal()}p.
      Это путешествие займет у вас ${time} минут.
      Теплоход отправляется в ${firstSide.value.substr(0, 5)}, а прибудет в ${travelEndHours}-${travelEndMinutes}.</p>
  `;

  selects.style.display = 'none';
  result.style.display = 'block';
});