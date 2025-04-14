// retrieve all the important stuff
const rangeInput = document.getElementById("range-bar");
const colorButtons = document.querySelectorAll(".color-circle");
const prevIndicator = document.getElementById("prev-indicator");
const historyListElement = document.getElementById("history-list");

// set default color
let currentColor = "green";
let defaultColor = "lightgray";
let previousValue = null;

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

function updatePreviousIndicator() {
  if (previousValue !== null) {
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

rangeInput.addEventListener("input", () => {
  const clonedRange = rangeInput.cloneNode(true);
  historyListElement.appendChild(clonedRange);

  updateRangeColor();
});
// rangeInput.addEventListener("change", () => {
//   historyRangeValues.push(rangeInput);


//   const liELement = document.createElement("li");
//   // for each range value we'll create a li with the range
//   historyRangeValues.forEach(rangeElement => {
//     // liELement.innerHTML = rangeElement;
//     historyListElement.appendChild(rangeElement);
//   });
//   historyListElement;
// });

rangeInput.addEventListener("change", updatePreviousIndicator);

updateRangeColor();

// see last updates
// create an array to store range-bar
// add an ul in html
// call it
// add event listener
// push it to array
// create li to append to ul
// append the ul child
