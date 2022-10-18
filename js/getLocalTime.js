dayjs.extend(window.dayjs_plugin_utc);
const firstSideSelect = document.getElementById('time-one');
const secondSideSelect = document.getElementById('time-two');

const TIME = {
  'из A в B': [
    '2021-08-21 15:00:00',
    '2021-08-21 15:30:00',
    '2021-08-21 15:45:00',
    '2021-08-21 16:00:00',
    '2021-08-21 16:15:00',
    '2021-08-21 18:00:00',
  ],
  'из B в A': [
    '2021-08-21 15:30:00',
    '2021-08-21 15:45:00',
    '2021-08-21 16:00:00',
    '2021-08-21 16:15:00',
    '2021-08-21 16:35:00',
    '2021-08-21 18:50:00',
    '2021-08-21 18:55:00',
  ]
}

const firstTime = TIME["из A в B"];
const secondTime = TIME["из B в A"];
let arrayA = [];
let arrayB = [];

const getSelects = () => {

  firstTime.forEach((item) => {
    arrayA.push(dayjs.utc(item).local().format('HH:mm') + '(из A в B)');
  });

  secondTime.forEach((item) => {
    arrayB.push(dayjs.utc(item).local().format('HH:mm') + '(из B в A)');
  });
};

getSelects();
const arrayBothSide = arrayA.concat(arrayB);

arrayBothSide.forEach((item) => {
  firstSideSelect.insertAdjacentHTML('beforeend', `
    <option value="${item}">${item}</option>
  `);
});

arrayB.forEach((item) => {
  secondSideSelect.insertAdjacentHTML('beforeend', `
    <option value="${item}">${item}</option>
  `);
});