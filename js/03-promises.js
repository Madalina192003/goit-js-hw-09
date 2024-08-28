document.querySelector(".form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Obținem valorile din formular
  const delayInput = document.querySelector('input[name="delay"]').value;
  const stepInput = document.querySelector('input[name="step"]').value;
  const amountInput = document.querySelector('input[name="amount"]').value;

  const firstDelay = Number(delayInput);
  const delayStep = Number(stepInput);
  const amount = Number(amountInput);

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * delayStep;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
