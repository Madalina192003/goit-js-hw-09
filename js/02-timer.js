// Selectăm elementele din interfață
const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

// Variabile globale pentru interval și data selectată
let countdownInterval = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      alert("Please choose a date in the future");
    } else {
      startButton.disabled = false;
    }
  },
};

// Inițializăm flatpickr pe input
flatpickr("#datetime-picker", options);

// Funcția pentru conversia milisecundelor în zile, ore, minute, și secunde
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

// Funcția pentru adăugarea de zero-uri la cifrele mici
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Funcția pentru actualizarea cronometrului în interfață
function updateTimer({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Funcția pentru pornirea cronometrului
startButton.addEventListener("click", () => {
  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = selectedDate - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimer(convertMs(0));
    } else {
      const time = convertMs(timeRemaining);
      updateTimer(time);
    }
  }, 1000);
});
