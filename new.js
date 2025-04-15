const rangeInput = document.getElementById("range-bar");
const prevIndicatorElement = document.getElementById("prev-indicator");
// get values from localStorage
let savedData = JSON.parse(localStorage.getItem("rangeData"));

// let markerValue = parseInt(rangeInput.value);
let thumbValue;
let markerValue;

function positionPreviousIndicator(value, indicatorElement) {
  const max = rangeInput.max || 100;
  const wrapperWidth = rangeInput.offsetWidth;
  const prevPercentage = (value / max) * 100;
  const leftOffset = (prevPercentage / max) * wrapperWidth;

  indicatorElement.style.left = `${leftOffset}px`;
  indicatorElement.style.display = "block";
}

// what if there's no info in localStorage
if (!savedData) {
  thumbValue = rangeInput.value;
  markerValue = thumbValue;

  const dataToStore = {
    thumbValue: thumbValue,
    markerValue: markerValue
  }
  // save object with all values
  localStorage.setItem("rangeData", JSON.stringify(dataToStore));
} else {
  markerValue = savedData.markerValue;
  thumbValue = savedData.thumbValue;
  rangeInput.value = thumbValue;

  positionPreviousIndicator(markerValue, prevIndicatorElement);
}

// add event listener to the range slider
rangeInput.addEventListener("change", () => {
  // mark previous progress
  positionPreviousIndicator(thumbValue, prevIndicatorElement);

  markerValue = thumbValue;
  thumbValue = parseInt(rangeInput.value);

  const dataToStore = {
    thumbValue: thumbValue,
    markerValue: markerValue
  }
  localStorage.setItem("rangeData", JSON.stringify(dataToStore));
});
