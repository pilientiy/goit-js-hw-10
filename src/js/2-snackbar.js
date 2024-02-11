import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayContainer = document.querySelector('input[name="delay"]');
const promiseStateSelector = document.querySelectorAll('input[name="state"]');

function getPromiseState(promiseStateSelector) {
  for (let i = 0; i < promiseStateSelector.length; i++) {
    if (promiseStateSelector[i].checked) {
      return promiseStateSelector[i].value;
    }
  }
}

function createPromise(delay, promiseStatus) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseStatus === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  return promise;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let promise = createPromise(
    delayContainer.value,
    getPromiseState(promiseStateSelector)
  );
  promise
    .then(value => {
      iziToast.success({
        message: `Fulfilled promise in ${value}ms`,
        position: 'topRight',
        transitionIn: 'fadeIn',
        progressBar: false,
      });
    })
    .catch(value => {
      iziToast.error({
        message: `Rejected promise in ${value}ms`,
        position: 'topRight',
        transitionIn: 'fadeIn',
        progressBar: false,
      });
    });
});
