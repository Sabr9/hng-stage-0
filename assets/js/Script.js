// DOM Elements
const viewMode = document.getElementById('todo-view-mode');
const editMode = document.getElementById('todo-edit-mode');
const editBtn = document.getElementById('edit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const saveBtn = document.getElementById('save-btn');
const expandBtn = document.querySelector('[data-testid="test-todo-expand-toggle"]');

const todoTitle = document.querySelector('[data-testid="test-todo-title"]');
const todoDescContainer = document.getElementById('todo-description-container');
const statusDisplay = document.querySelector('[data-testid="test-todo-status-control"]');
const priorityIndicator = document.querySelector('[data-testid="test-todo-priority-indicator"]');
const completeCheckbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');

// Toggle Edit Mode
editBtn.addEventListener('click', () => {
    viewMode.style.display = 'none';
    editMode.style.display = 'block';
});

cancelBtn.addEventListener('click', () => {
    editMode.style.display = 'none';
    viewMode.style.display = 'block';
});

// Expand/Collapse Logic
expandBtn.addEventListener('click', () => {
    const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
    expandBtn.setAttribute('aria-expanded', !isExpanded);
    todoDescContainer.style.display = isExpanded ? 'none' : 'block';
    expandBtn.innerText = isExpanded ? 'Show More' : 'Show Less';
});

// Save Logic
saveBtn.addEventListener('click', () => {
    todoTitle.innerText = document.getElementById('edit-title').value;
    document.querySelector('[data-testid="test-todo-description"]').innerText = document.getElementById('edit-desc').value;
    
    const priority = document.getElementById('edit-priority').value;
    priorityIndicator.innerText = priority;
    priorityIndicator.className = 'priority-' + priority.toLowerCase();

    updateTimeDisplay();
    editMode.style.display = 'none';
    viewMode.style.display = 'block';
});

// Checkbox Sync
completeCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        statusDisplay.innerText = "Done";
        todoTitle.style.textDecoration = "line-through";
        todoTitle.style.opacity = "0.5";
    } else {
        statusDisplay.innerText = "Pending";
        todoTitle.style.textDecoration = "none";
        todoTitle.style.opacity = "1";
    }
});

// Time Management
function updateTimeDisplay() {
    const dueDateValue = document.getElementById('edit-date').value;
    const timeRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]');
    const overdueIndicator = document.querySelector('[data-testid="test-todo-overdue-indicator"]');

    if (!dueDateValue) return;

    const now = new Date();
    const dueDate = new Date(dueDateValue);
    const diff = dueDate - now;

    if (diff < 0) {
        overdueIndicator.innerText = "⚠️ Overdue";
        timeRemaining.innerText = "Time has passed!";
        timeRemaining.style.color = "red";
    } else {
        const mins = Math.floor(diff / 60000);
        overdueIndicator.innerText = "";
        timeRemaining.innerText = `Due in ${mins} mins`;
        timeRemaining.style.color = "black";
    }
}
setInterval(updateTimeDisplay, 30000);