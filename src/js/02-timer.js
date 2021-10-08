import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import notiflix from 'notiflix';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const inputForm = document.querySelector('#date-selector');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

const daysLog = document.querySelector('span[data-days]');
const hoursLog = document.querySelector('span[data-hours]');
const minutesLog = document.querySelector('span[data-minutes]');
const secondsLog = document.querySelector('span[data-seconds]');
const timeBoard = document.querySelector('.timer');
const timeBoardItem = document.querySelectorAll('.timer .field').forEach(item => {
  item.style.marginRight = '10px';
});
timeBoard.style.display = 'flex';
timeBoard.style.marginTop = '20px';

btnStart.disabled = true;

let countDown = {};
let currentDate = new Date();
let selectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate > currentDate) {
      btnStart.disabled = false;
    } else {
      notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};

flatpickr(inputForm, options);

btnStart.addEventListener('click', startTimer);

let timerId;

function startTimer() {
  timerId = setInterval(() => {
    currentDate = new Date();

    if (currentDate < selectedDate) {
      countDown = convertMs(selectedDate - currentDate);
      showCountDown(countDown);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

btnStop.addEventListener('click', stopTimer);

function stopTimer() {
  clearInterval(timerId);
}

function showCountDown(countDown) {
  daysLog.textContent = addLeadingZero(countDown.days);
  hoursLog.textContent = addLeadingZero(countDown.hours);
  minutesLog.textContent = addLeadingZero(countDown.minutes);
  secondsLog.textContent = addLeadingZero(countDown.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
