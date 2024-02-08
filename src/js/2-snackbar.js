`use strict`;
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formRef = document.querySelector('form');

formRef.addEventListener('submit', ev => {
    ev.preventDefault();
    const delay = parseInt(formRef.elements.delay.value);
    const state = formRef.elements.state.value;

    function createPromise(delay, isValid) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (isValid) {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        });
        return promise;
    }

    const isActive = Math.random() > 0.5;
    const promise = createPromise(delay, state === 'fulfilled');
    promise.then(onFullFiled). catch(onRejected);


    function onFullFiled(delay) {
        iziToast.success({
            title: `✅ Fulfilled promise in ${delay}ms`,
            message: `Promise resolved successfully!`,
        });
    }

    function onRejected(delay) {
        iziToast.error({
            title: `❌ Rejected promise in ${delay}ms`,
            message: `Promise rejected!`,
        });
    };
});
