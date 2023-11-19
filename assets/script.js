

// Funtion for current date and for loop for time and date //

$(function () {
    displayCurrentDate();

    var maxHours = 8;
    var calendarTime = 9;

    for (var i = 0; i <= maxHours; i++) {
        //   irlTime = new Date();
        var irlTime = new Date(2023, 10, 15, 12, 0, 0, 0);
        var blockType = compareTime(dayjs(irlTime), dayjs().hour(calendarTime));

        createTimeBlock(calendarTime, blockType);

        addEventListenersForSaveButton(calendarTime);

        displaySavedTodos(calendarTime);

        calendarTime += 1;
    }
});

// Function that creates the timeblocks //

function createTimeBlock(hour, timeBlockType) {
    var mainDiv = document.createElement("div");
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

function convertToHour(hour) {
    return dayjs().hour(hour).format('hA')
}

// Function to compare current time and calendar time //

function compareTime(currentTime, calendarTime) {
    if (dayjs(currentTime).isBefore(calendarTime, 'hour')) {
        return 'past';
    } else if (dayjs(currentTime).isAfter(calendarTime, 'hour')) {
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
        default:
            return 'th';
    }
}

// Function to save ToDo to local storage //

function saveToDo(id) {
    var currentToDo = document.getElementById(`hour-${id}`);
    var description = currentToDo.querySelectorAll('.description');

    localStorage.setItem(`hour-${id}`, description[0].value);
}

// Event Listener for savebutton //

function addEventListenersForSaveButton(id) {
    var currentToDo = document.getElementById(`hour-${id}`);

    var saveBtn = currentToDo.querySelectorAll('.saveBtn');

    saveBtn[0].addEventListener('click', function () {
        saveToDo(id)
    });
}

// Function to display saved ToDos //

function displaySavedTodos(calendarTime) {
    var savedDescription = localStorage.getItem(`hour-${calendarTime}`);

    if (savedDescription !== null) {
        var currentToDo = document.getElementById(`hour-${calendarTime}`);
        var description = currentToDo.querySelectorAll('.description');

        description[0].value = savedDescription;
    }
}


