const rangeWrapperELement = document.getElementById("range-wrapper")
const rangeInput = document.getElementById("range-bar");
const prevIndicatorElement = document.getElementById("prev-indicator");
const colorButtons = document.querySelectorAll(".color-circle");
const historyListElement = document.getElementById("history-list");

// get values from localStorage
let savedData = JSON.parse(localStorage.getItem("rangeData"));

let thumbValue;
let markerValue;

let currentColor = "green";
let defaultColor = "lightgray";

function positionPreviousIndicator(value, indicatorElement) {
  const max = rangeInput.max || 100;
  const wrapperWidth = rangeInput.offsetWidth;
  const prevPercentage = (value / max) * 100;
  const leftOffset = (prevPercentage / max) * wrapperWidth;

  indicatorElement.style.left = `${leftOffset}px`;
  indicatorElement.style.display = "block";
}

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

// what if there's no info in localStorage
if (!savedData) {
  thumbValue = rangeInput.value;
  markerValue = thumbValue;

  const dataToStore = {
    thumbValue: thumbValue,
    markerValue: markerValue,
    selectedColor: currentColor
  }
  // save object with all values
  localStorage.setItem("rangeData", JSON.stringify(dataToStore));
} else {
  markerValue = savedData.markerValue;
  thumbValue = savedData.thumbValue;
  selectedColor = savedData.selectedColor;
  rangeInput.value = thumbValue;

  positionPreviousIndicator(markerValue, prevIndicatorElement);

  if (selectedColor) {
    currentColor = savedData.selectedColor;
    updateRangeColor();
  }
}

// click to change range color
colorButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentColor = button.style.backgroundColor;
    updateRangeColor();

    const updatedData = {
      thumbValue: thumbValue,
      markerValue: markerValue,
      selectedColor: currentColor
    }
    localStorage.setItem("rangeData", JSON.stringify(updatedData));
  });
});

// add event listener to the range slider
rangeInput.addEventListener("change", () => {
  // mark previous progress
  positionPreviousIndicator(thumbValue, prevIndicatorElement);

  markerValue = thumbValue;
  thumbValue = parseInt(rangeInput.value);

  const dataToStore = {
    thumbValue: thumbValue,
    markerValue: markerValue,
    selectedColor: currentColor
  }
  localStorage.setItem("rangeData", JSON.stringify(dataToStore));

  // see last updates
  const clonedElement = rangeWrapperELement.cloneNode(true);

  const clonedPrevIndicator = clonedElement.querySelector("#prev-indicator");
  if (clonedPrevIndicator && markerValue !== null) {
    positionPreviousIndicator(markerValue, clonedPrevIndicator);
  }

  historyListElement.appendChild(clonedElement);


  updateRangeColor();
});

updateRangeColor();
