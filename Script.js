function updateCountdown() {
const timeLeftDisplay = document.querySelector('[data-testid="test-todo-time-remaining"]');
const deadline = new Date("April 16, 2026 23:59:59").getTime();
const now = new Date() .getTime();
const difference = deadline - now;

if (difference < 0) {
    timeLeftDisplay.innerText = "Overdue!";
    return;
}
const daysRemaining = Math.floor( difference / (1000 * 60 * 60 * 24));
const hoursRemaining = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

if (daysRemaining > 0) {
    timeLeftDisplay.innerText = `Due in ${daysRemaining} days`;
} else {
    timeLeftDisplay.innerText = `Due in ${hoursRemaining} hours`;
 }
}
updateCountdown();

const checkbox = document.querySelector(`[data-testid="test-todo-complete-toggle"]`);
const title = document.querySelector(`[data-testid="test-todo-title"]`);

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        title.style.textDecoration = "line-through";
        title.style.opacity = "0.5";
} else {
    title.style.textDecoration = "none";
    title.style.opacity = "1";
}

});