const inputNaturalTextElement = document.getElementById("natural-text");
const inputStartDateElement = document.getElementById("start-date");
const inputEndDateElement = document.getElementById("end-date");

const today = new Date();
const targetDate = new Date(today);

const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const times = ["morning", "noon", "afternoon", "evening"];
const timesValues = ["09:00", "12:00", "14:00", "18:00"];
let timeString = "12:00";

inputNaturalTextElement.addEventListener("keyup", (e) => {
  e.preventDefault();

  const textValue = inputNaturalTextElement.value.toLowerCase();
  let newDate;

  for (const format of formats) {
    if (textValue.match(format.regex)) {
      result = format.logic(textValue);

      if (result !== null && result !== undefined) {
        if (format.regex === formats[0].regex) {
          newDate = result;
        } else if (format.regex === formats[1].regex) {
          timeString = result;
        } else if (format.regex === formats[2].regex) {
          newDate = result.daysUntilTarget;
          timeString = result.hour;
        } else if (format.regex === formats[3].regex) {
          newDate = result;
        }
      }
    };

    if (newDate !== null && newDate !== undefined && timeString) {
      targetDate.setDate(today.getDate() + newDate);

      const isoDate = targetDate.toISOString().split("T")[0];

      const fullDateTime = `${isoDate}T${timeString}`
      const fullsStartDateTime = `${today.toISOString().split("T")[0]}T${timeString}`

      inputStartDateElement.value = fullsStartDateTime;
      inputEndDateElement.value = fullDateTime;
    }
  };
});

const formats = [
  {
    regex: /(next)?\s(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/,
    logic: (textValue) => {
      const listOfMatchResult = textValue.match(/(next)?\s(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/);

      if (listOfMatchResult) {
        const dayOfTheWeek = listOfMatchResult[2];

        const foundDay = weekdays.find(day => dayOfTheWeek.toLowerCase() === day.toLowerCase());

        if (foundDay) {
          const targetDayIndex = weekdays.indexOf(foundDay);
          const currentDayIndex = today.getDay();
          let daysUntilTarget = (targetDayIndex - currentDayIndex + 7) % 7
          if (daysUntilTarget === 0) daysUntilTarget = 7

          return daysUntilTarget;
        };
      };
      return null;
    }
  },
  {
    regex: /(morning|noon|afternoon|evening)/,
    logic: (textValue) => {
      for (let index = 0; index < times.length; index++) {
        if (textValue.includes(times[index])) {
          return timesValues[index];
        }
      }
      return null;
    }
  },
  {
    regex: /(sun(?:day)?|mon(?:day)?|tue(?:sday)?|wed(?:nesday)?|thu(?:rsday)?|fri(?:day)?|sat(?:urday)?)(?:\s+(\d{1,2}:\d{2}))?/,
    logic: (textValue) => {
      const listOfMatchResult = textValue.match(/(sun(?:day)?|mon(?:day)?|tue(?:sday)?|wed(?:nesday)?|thu(?:rsday)?|fri(?:day)?|sat(?:urday)?)(?:\s+(\d{1,2}:\d{2}))?/);

      if (listOfMatchResult) {
        const day = listOfMatchResult[1];
        const hour = listOfMatchResult[2] || "12:00";

        const foundDay = weekdays.find(dayOfTheWeek => dayOfTheWeek.startsWith(day));

        if (foundDay) {
          const targetDayIndex = weekdays.indexOf(foundDay);
          const currentDayIndex = today.getDay();
          let daysUntilTarget = (targetDayIndex - currentDayIndex + 7) % 7
          if (daysUntilTarget === 0) daysUntilTarget = 7

          return { daysUntilTarget, hour };
        };
      };
      return null;
    }
  },
  {
    regex: /\b(today|tomorrow|next day)\b/,
    logic: (textValue) => {
      const listOfMatchResult = textValue.match(/\b(today|tomorrow|next day)\b/);

      if (listOfMatchResult) {
        const day = listOfMatchResult[0];

        switch (day) {
          case "today":
            return 0;
          case "tomorrow":
          case "next day":
            return 1;
        }
      };
      return null;
    }
  }
]
