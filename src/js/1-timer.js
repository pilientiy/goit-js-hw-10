import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const datePicker = document.querySelector('#datetime-picker');

const timerContainer = {
  seconds: document.querySelector('span[data-seconds]'),
  minutes: document.querySelector('span[data-minutes]'),
  hours: document.querySelector('span[data-hours]'),
  days: document.querySelector('span[data-days]'),
};
let userSelectedDate = '';

function startButtonEnabeld(startButton, condition = false) {
  if (condition === false) {
    startButton.setAttribute('disabled', 'true');
  } else {
    startButton.removeAttribute('disabled');
  }
}

function datePickerEnabled(datePicker, condition = true) {
  if (condition === false) {
    datePicker.setAttribute('disabled', 'true');
  } else {
    datePicker.removeAttribute('disabled');
  }
}

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

function addLeadingZero(timeToFormat) {
  let formattedTimer = {};
  for (const key in timeToFormat) {
    if (timeToFormat[key] < 10) {
      formattedTimer[key] = timeToFormat[key].toString().padStart(2, 0);
    } else {
      formattedTimer[key] = timeToFormat[key].toString();
    }
  }
  return formattedTimer;
}

function renderTimer(formattedTimer, timerContainer) {
  for (const key in formattedTimer) {
    timerContainer[key].textContent = formattedTimer[key];
  }
}

function startTimer() {
  startButtonEnabeld(startButton, false);
  datePickerEnabled(datePicker, false);
  const timerId = setInterval(() => {
    const currentDate = new Date();
    if (userSelectedDate.getTime() - currentDate.getTime() < 0) {
      clearInterval(timerId);
    } else {
      const timeToCountdown = convertMs(
        userSelectedDate.getTime() - currentDate.getTime()
      );
      const formattedTimer = addLeadingZero(timeToCountdown);
      renderTimer(formattedTimer, timerContainer);
    }
  }, 1000);
}

datePickerEnabled(datePicker, true);
startButtonEnabeld(startButton, false);
startButton.addEventListener('click', startTimer);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = new Date(selectedDates[0]);
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      iziToast.error({
        message: 'Please choose a date in the future',
        timeout: 2000,
        position: 'topRight',
        transitionIn: 'fadeIn',
        progressBar: false,
      });
      startButtonEnabeld(startButton, false);
    } else {
      startButtonEnabeld(startButton, true);
    }
  },
});
