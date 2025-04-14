// retrieve all the important stuff
const rangeInput = document.getElementById("range-bar");
const colorButtons = document.querySelectorAll(".color-circle");
const prevIndicator = document.getElementById("prev-indicator");

// set default color
let currentColor = "green";
let defaultColor = "lightgray";
let previousValue = null;

// rangeInput.addEventListener("input", () => {
//   const currentValue = rangeInput.value;

//   if (previousValue !== null) {
//     const marker = document.querySelector(".previous-marker");
//     const percent = (previousValue / rangeInput.max) * 100;
//     marker.style.left = `${percent}%`;
//   }

//   previousValue = currentValue;
// });

// gradient background based on range value
function updateRangeColor() {
  // const value = rangeInput.value;
  const value = parseInt(rangeInput.value);
  const max = rangeInput.max || 100;
  const percentage = (value / max) * 100;

  if (currentColor == "green") {
    rangeInput.style.background = `linear-gradient(to right, ${currentColor} ${percentage}%, #f2f1f1 ${percentage}%)`;
  } else {
    rangeInput.style.background = `linear-gradient(to right, ${defaultColor} ${percentage}%, #f2f1f1 ${percentage}%)`;
  }

  // set the thumb color
  rangeInput.style.setProperty("--thumb-color", currentColor);
}

function updatePreviousIndicator() {
  if (previousValue !== null) {
    const max = rangeInput.max || 100;
    const wrapperWidth = rangeInput.offsetWidth;
    const prevPercentage = (previousValue / max) * 100;
    const leftOffset = (prevPercentage / max) * wrapperWidth;

    prevIndicator.style.left = `${leftOffset}px`;
    prevIndicator.style.display = "block";
  }
  // save prevAlue with value
  previousValue = parseInt(rangeInput.value);
}

// click to change range color
colorButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentColor = button.style.backgroundColor;
    updateRangeColor();
  });
});

rangeInput.addEventListener("input", updateRangeColor);
rangeInput.addEventListener("change", updatePreviousIndicator);

updateRangeColor();

// see last updates
