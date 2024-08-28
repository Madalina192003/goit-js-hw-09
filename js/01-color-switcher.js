// Funcția pentru generarea unei culori aleatorii
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

// Selectăm butoanele
const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");

// Variabilă pentru a stoca id-ul intervalului
let colorIntervalId = null;

// Event listener pentru butonul "Start"
startButton.addEventListener("click", () => {
  // Dezactivăm butonul "Start"
  startButton.disabled = true;

  // schimbarea culorii de fundal
  colorIntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

// Event listener pentru butonul "Stop"
stopButton.addEventListener("click", () => {
  // Oprim schimbarea culorii
  clearInterval(colorIntervalId);

  // Reactivăm butonul "Start"
  startButton.disabled = false;
});
