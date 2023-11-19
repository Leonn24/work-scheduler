

// Function that creates the timeblocks //

function createTimeBlock(hour, timeBlockType) {
    var mainDiv = document.createElement('div');
    mainDiv.id = `hour-${hour}`;
    mainDiv.className = `row time-block ${timeBlockType}`;
  
    var hourDiv = document.createElement("div");
    hourDiv.className = "col-2 col-md-1 hour text-center py-3";
    hourDiv.textContent = convertToHour(hour);
  
    var textarea = document.createElement("textarea");
    textarea.className = "col-8 col-md-10 description";
    textarea.rows = "3";
  
    var button = document.createElement("button");
    button.className = "btn saveBtn col-2 col-md-1";
    button.setAttribute("aria-label", "save");
  
    var icon = document.createElement("i");
    icon.className = "fas fa-save";
    icon.setAttribute("aria-hidden", "true");
  
    button.appendChild(icon);
  
    mainDiv.appendChild(hourDiv);
    mainDiv.appendChild(textarea);
    mainDiv.appendChild(button);
  
    document.body.appendChild(mainDiv);
  }

  // Function that converts to hour //

  function convertToHour (hour) {
    return dayjs().hour(hour).format('hA')
  }

  // Function to compare current time and calendar time //

  function compareTime(currentTime, calenderTime) {
    if (dayjs(currentTime).isBefore(calenderTime, 'hour')) {
        return 'past';
    } else if (dayjs(currentTime).isAfter(calenderTime, 'hour')){
        return 'future'
    } else {
        return 'present';
    }
  }

  // Function to display current date // 

  function displayCurrentDate() {
    var date = document.getElementById('currentDay');
    var currentDate = new Date();
    var currentDay = dayjs(currentDate).format('D');

    date.innerHTML = dayjs(currentDate).format('dddd, MMMM D') + getOrdinalSuffix(currentDay);

  }

  // Function to get Ordinal Suffix //

  function getOrdinalSuffix(number) {
  if (number >= 11 && number <= 13) {
    return 'th';
  } 
  var lastDigit = number % 10;
  switch (lastDigit) {
    case 1:
        return 'st';
    case 2: 
        return 'nd';
    case 3:
        return 'rd';
    case 4: 
        return 'th';
  }
}


  