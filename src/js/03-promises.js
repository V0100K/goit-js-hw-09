import { Notify } from 'notiflix/build/notiflix-notify-aio';
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
const delay = form.elements['delay'];
const step = form.elements['step'];
const quantity = form.elements['amount'];

form.addEventListener('submit', e => {
  e.preventDefault();
  let sumMin = parseInt(delay.value);

  for (let i = 0; i < quantity.value; i++) {
    // createPromise(i + 1, delay + step * i);
    createPromise(i + 1, sumMin)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    sumMin += parseInt(step.value);
  }
});
