`use strict`;
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
    let userSelectedDate;
    const btnStartRef = document.querySelector('[data-start]');
    const inputRef = document.querySelector('#datetime-picker');
    const daysRef = document.querySelector('[data-days]');
    const hoursRef = document.querySelector('[data-hours]');
    const minutesRef = document.querySelector('[data-minutes]');
    const secondsRef = document.querySelector('[data-seconds]');

    const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];

        const currenDate = new Date();
        if (userSelectedDate < currenDate) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
        });
        btnStartRef.disabled = true;
        } else {
        btnStartRef.disabled = false;
        }
    },
    };
    flatpickr(inputRef, options);

    btnStartRef.addEventListener('click', () => {
    if (userSelectedDate) {
        startTimer(userSelectedDate, daysRef, hoursRef, minutesRef, secondsRef);
        btnStartRef.disabled = true;
        inputRef.disabled = true;
    }
    });
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function startTimer(endDate, daysRef, hoursRef, minutesRef, secondsRef) {
    const interval = setInterval(() => {
    const now = new Date().getTime();
    const diff = endDate - now;
    if (diff <= 0) {
        clearInterval(interval);
        daysRef.textContent = '00';
        hoursRef.textContent = '00';
        minutesRef.textContent = '00';
        secondsRef.textContent = '00';
        return;
    }
    const { days, hours, minutes, seconds } = convertMs(diff);
    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minutesRef.textContent = addLeadingZero(minutes);
    secondsRef.textContent = addLeadingZero(seconds);
    }, 1000);
}
