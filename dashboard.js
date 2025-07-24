const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const displayWeekDay = document.getElementById("day")
const displayDayNb = document.getElementById("number")
const displayMonth = document.getElementById("month")

const day = new Date()
let todayName = day.getDay()
let todayNumber = day.getDate()
let todayMonth = day.getMonth()

displayWeekDay.innerHTML = weekday[todayName]
displayDayNb.innerHTML = todayNumber
displayMonth.innerHTML = month[todayMonth]

const addTaskBtn = document.getElementById("add-btn")
const inputTask = document.getElementById("write-task")
let taskList = [];
const taskSpans = [];

const progressBarValue = document.getElementById("progress-bar")
let totalTasks = 0;

const finishBtn = document.getElementById("finish-btn");
finishBtn.addEventListener("click", () => {
    console.log("Saving progress:", progressBarValue.value); // Debugging
    localStorage.setItem("finalProgress", progressBarValue.value);
    window.electronAPI.loadPage("finishDay.html");
})

for (let i = 1; i <= 7; i++) {
    let taskSpan = document.getElementById("text-task-" + i);

    if (taskSpan) {
        taskSpans.push(taskSpan);

        taskSpan.addEventListener("click", (event) => {
            event.target.classList.toggle("done")
            event.target.classList.toggle("checked")
            updateProgressBar()
        })
    }
}

addTaskBtn.addEventListener("click", () => {
    if (inputTask.value.trim() === "") {
        console.warn("Please enter a task before adding to the list.");
    } else if (taskList.length >= 7) {
        console.warn("Task list is full. You can only add up to 7 tasks.");
    } else {
        taskList.push(inputTask.value);
        updateTaskDisplay(); //Update spans with new task list
        inputTask.value = ""; //Clear input field
        totalTasks++
        updateProgressBar()
    }
});

function updateTaskDisplay() {
    for (let i = 0; i < taskSpans.length; i++) {
        if (taskList[i]) {
            taskSpans[i].textContent = taskList[i];
        } else {
            taskSpans[i].textContent = "";
        }
    }
}

function updateProgressBar() {
    const checkedElements = document.querySelectorAll(".checked");
    const checkedCount = checkedElements.length;
    const totalTasks = taskList.length;
    const progress = checkedCount / totalTasks;

    progressBarValue.value = progress * 100;
}