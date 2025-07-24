const finalConclusion = Number(localStorage.getItem("finalProgress"));
const success = document.getElementById("successTasks");
const unsuccess = document.getElementById("unsuccessTasks");
const title = document.getElementById("final-title");
const conclusion = document.getElementById("conclusion");

console.log("Final Progress:", finalConclusion);
console.log("Type of finalProgress:", typeof finalConclusion);

// Check if finalConclusion is a valid number
if (isNaN(finalConclusion)) {
    console.log("Invalid final progress value");
} else if (finalConclusion === 100) {
    success.removeAttribute("hidden"); 
    title.innerHTML = "You're doing good!";
    conclusion.innerText = `Your final progress: ${Math.round(finalConclusion)}%`;
} else {
    unsuccess.removeAttribute("hidden"); 
    title.innerHTML = "Keep going!";
    conclusion.innerText = `Your final progress: ${Math.round(finalConclusion)}%`;
}

// Restart button functionality
const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", () => { window.electronAPI.loadPage("index.html"); });