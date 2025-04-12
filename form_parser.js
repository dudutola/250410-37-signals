// get form + inputs
// add event listener to input natural-text

const formElement = document.getElementById("parsing-form");
const inputNaturalTextElement = document.getElementById("natural-text");
const inputStartDateElement = document.getElementById("start-date");
const inputEndDateElement = document.getElementById("end-date");

const today = new Date();
// create arrays with days
const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
// create arrays with time of days
const times = ["morning", "noon", "afternoon", "evening"];
// create arrays with times values
const timesValues = ["09:00", "12:00", "14:00", "18:00"];
let timeString = "12:00";

inputNaturalTextElement.addEventListener("keyup", (e) => {
  console.log(e);
  e.preventDefault();

  // get input value
  const textValue = inputNaturalTextElement.value.toLowerCase();

  const listOfMatchResult = textValue.match(/(next) (sunday|monday|tuesday|wednesday|thursday|friday|saturday)/);
  // if the input includes next friday ....
  if (listOfMatchResult) {
    const nextMatch = listOfMatchResult[1];
    const dayOfTheWeek = listOfMatchResult[2];

    const foundDay = weekdays.find(day => dayOfTheWeek.toLowerCase() === day.toLowerCase());

    if (foundDay) {
      const targetDayIndex = weekdays.indexOf(foundDay);
      const currentDayIndex = today.getDay();
      let daysUntilTarget = (targetDayIndex - currentDayIndex + 7) % 7
      if (daysUntilTarget === 0) daysUntilTarget = 7

      // const targetDate = new Date(today);
      // targetDate.setDate(today.getDate() + daysUntilTarget);

      // const formatted = targetDate.toISOString().split("T")[0];
      // inputStartDateElement.value = formatted;
      // inputEndDateElement.value = formatted;

      times.forEach((time, index) => {
        if (textValue.includes(time)) {
          timeString = timesValues[index];
        }
      });

      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + daysUntilTarget);

      const isoDate = targetDate.toISOString().split("T")[0];
      console.log(isoDate)
      const fullDateTime = `${isoDate}T${timeString}`
      const fullsStartDateTime = `${today.toISOString().split("T")[0]}T${timeString}`

      inputStartDateElement.value = fullsStartDateTime;
      inputEndDateElement.value = fullDateTime;
    };
  };
});
