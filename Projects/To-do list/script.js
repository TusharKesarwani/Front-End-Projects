const descriptionInput = document.getElementById("description");
const linkInput = document.getElementById("link");
const listContainer = document.getElementById("list-container");

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task));
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a task
function addTask() {
    const description = descriptionInput.value.trim();
    const link = linkInput.value.trim();

    if (description === '') {
        alert("Description cannot be empty!");
        return;
    }

    // Create task object
    const task = {
        description: description,
        link: link,
     
        date: new Date().toLocaleString(),
        checked: false // Initially unchecked
    };

    // Render task
    renderTask(task);

    // Clear input fields
    descriptionInput.value = '';
    linkInput.value = '';
 

    // Get tasks from localStorage, add new task, and save
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    saveTasks(tasks);
}

// Render task on the list
function renderTask(task) {
    const li = document.createElement("li");
    li.innerHTML = ` 
        <input type="checkbox" onchange="toggleStrikeThrough(this)"> 
        <div>Description: <span>${task.description}</span></div>
        <div>Link: ${task.link ? `<a href="${task.link}" target="_blank">${task.link}</a>` : 'Not provided'}</div>
        <div>Date: ${task.date}</div>  
        <button onclick="deleteTask(this)">Delete</button>  
        
    `;
    listContainer.appendChild(li);

    // Apply initial checked state
    if (task.checked) {
        li.querySelector("input[type='checkbox']").checked = true;
        li.classList.add("checked");
    }
}


// Toggle strikethrough effect and save checkbox state
function toggleStrikeThrough(checkbox) {
    const li = checkbox.parentElement;
    li.classList.toggle("checked");

    // Update task's checked property
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = Array.from(listContainer.children).indexOf(li);
    tasks[index].checked = checkbox.checked;

    // Save tasks to localStorage
    saveTasks(tasks);
}


// Delete task
function deleteTask(button) {
    const li = button.parentElement;
    li.remove();

    // Remove task from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = Array.from(listContainer.children).indexOf(li);
    tasks.splice(index, 1);
    saveTasks(tasks);
}

// Load tasks when the page loads
loadTasks();
