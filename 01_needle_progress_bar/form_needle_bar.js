// retrieve all the important stuff
const rangeWrapperELement = document.getElementById("range-wrapper")
const rangeInput = document.getElementById("range-bar");
const colorButtons = document.querySelectorAll(".color-circle");
const prevIndicator = document.getElementById("prev-indicator");
const historyListElement = document.getElementById("history-list");

// set default color
let currentColor = "green";
let defaultColor = "lightgray";
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

//
function positionPreviousIndicator(value, indicator) {
  const max = rangeInput.max || 100;
  const wrapperWidth = rangeInput.offsetWidth;
  const prevPercentage = (value / max) * 100;
  const leftOffset = (prevPercentage / max) * wrapperWidth;

  indicator.style.left = `${leftOffset}px`;
  indicator.style.display = "block";
}

// mark previous progress
function updatePreviousIndicator() {
  if (previousValue !== null) {
    positionPreviousIndicator(previousValue, prevIndicator);
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
  // store data
  const dataToStore = {
    value: rangeInput.value,
    previousValue: previousValue
  };
  // need range + indicator hash?
  localStorage.setItem("rangeValue", rangeInput.value);
  // localStorage.setItem("rangeValue", JSON.stringify(dataToStore));

  // see last updates
  const clonedElement = rangeWrapperELement.cloneNode(true);

  const clonedPrevIndicator = clonedElement.querySelector("#prev-indicator");
  if (clonedPrevIndicator && previousValue !== null) {
    positionPreviousIndicator(previousValue, clonedPrevIndicator);
  }

  historyListElement.appendChild(clonedElement);

  updateRangeColor();
});

window.addEventListener("DOMContentLoaded", () => {
  const savedRangeValue = localStorage.getItem("rangeValue");
  // const savedRangeValue = JSON.parse(localStorage.getItem("rangeValue"));

  if (savedRangeValue !== null) {
    rangeInput.value = savedRangeValue;
    // rangeInput.value = savedRangeValue.value;
    // previousValue = parseInt(savedRangeValue.previousValue);

    // nope just doesnt move
    // prevIndicator.style.display = "none";

    // clone prevIndicator
    // const clonedPrevIndicator = prevIndicator.cloneNode(true);
    // clonedPrevIndicator.classList.add("2");
    // clonedPrevIndicator.style.display = "block";

    // rangeInput.parentNode.appendChild(clonedPrevIndicator)

    // positionPreviousIndicator(previousValue, prevIndicator);
    // positionPreviousIndicator(previousValue, clonedPrevIndicator);
  }
});

rangeInput.addEventListener("change", updatePreviousIndicator);

updateRangeColor();
