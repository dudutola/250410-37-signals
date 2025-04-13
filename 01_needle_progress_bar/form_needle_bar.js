// retrieve all the important stuff
const rangeInput = document.getElementById("range-bar");
const colorButtons = document.querySelectorAll(".color-circle");

// set default color
let currentColor = "green";

// gradient background based on range value
function updateRangeColor() {
  const value = rangeInput.value;
  const max = rangeInput.max || 94;
  const percentage = (value / max) * 94;

  rangeInput.style.background = `linear-gradient(to right, ${currentColor} ${percentage}%, lightgray ${percentage}%)`;

  // set the thumb color
  rangeInput.style.setProperty('--thumb-color', currentColor);
}

// click to change range color
colorButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentColor = button.style.backgroundColor;
    updateRangeColor();
  });
});

rangeInput.addEventListener("input", updateRangeColor);

updateRangeColor();

// see last updates
