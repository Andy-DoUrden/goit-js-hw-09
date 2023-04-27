import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('button[data-start]'),
  timer: document.querySelectorAll('.value'),
};

let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();

    const currentDate = Date.now();

    if (selectedDate > currentDate) {
      refs.btn.disabled = false;
    } else {
      refs.btn.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

const fp = flatpickr(refs.input, options);

refs.btn.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  refs.btn.disabled = true;
  refs.input.disabled = true;

  setRemainingInterval();
}

function setRemainingInterval() {
  const remainingInterval = setInterval(() => {
    const currentDate = Date.now();
    const convertedRemainingTime = convertMs(selectedDate - currentDate);

    if (selectedDate - currentDate < 0) {
      Notify.success('Congrats, the timer is up!');
      refs.btn.disabled = false;
      refs.input.disabled = false;
      clearInterval(remainingInterval);
    }

    refs.timer[0].textContent = convertedRemainingTime.days;
    refs.timer[1].textContent = convertedRemainingTime.hours;
    refs.timer[2].textContent = convertedRemainingTime.minutes;
    refs.timer[3].textContent = convertedRemainingTime.seconds;
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
