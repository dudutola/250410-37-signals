// retrieve all the important stuff
const rangeWrapperELement = document.getElementById("range-wrapper")
const rangeInput = document.getElementById("range-bar");
const colorButtons = document.querySelectorAll(".color-circle");
const prevIndicator = document.getElementById("prev-indicator");
const historyListElement = document.getElementById("history-list");

// set default color
let currentColor = "green";
let defaultColor = "lightgray";
// let previousValue = null;
let previousValue = parseInt(rangeInput.value);

// gradient background based on range value
function updateRangeColor() {
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

// mark previous progress
function updatePreviousIndicator() {
  if (previousValue !== null) {
    // repetition
    const max = rangeInput.max || 100;
    const wrapperWidth = rangeInput.offsetWidth;
    const prevPercentage = (previousValue / max) * 100;
    const leftOffset = (prevPercentage / max) * wrapperWidth;

    prevIndicator.style.left = `${leftOffset}px`;
    prevIndicator.style.display = "block";
  }
  previousValue = parseInt(rangeInput.value);
}

// click to change range color
colorButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentColor = button.style.backgroundColor;
    updateRangeColor();
  });
});

rangeInput.addEventListener("change", () => {
  // see last updates
  const clonedElement = rangeWrapperELement.cloneNode(true);

  const clonedPrevIndicator = clonedElement.querySelector("#prev-indicator");
  if (clonedPrevIndicator && previousValue !== null) {
    // repetition
    const max = rangeInput.max || 100;
    const wrapperWidth = rangeInput.offsetWidth;
    const prevPercentage = (previousValue / max) * 100;
    const leftOffset = (prevPercentage / 100) * wrapperWidth;

    clonedPrevIndicator.style.left = `${leftOffset}px`;
    clonedPrevIndicator.style.display = "block";
  }
  // updatePreviousIndicator(clonedElement);

  historyListElement.appendChild(clonedElement);

  updateRangeColor();
});

rangeInput.addEventListener("change", updatePreviousIndicator);

updateRangeColor();
