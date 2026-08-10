const inputBox = document.getElementById("taskInput");
const listContainer = document.getElementById("taskList");

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === "") {
        alert("You must write something!");
        return;
    }

    const tasks = listContainer.getElementsByTagName("li");
    console.log(tasks);
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].childNodes[0].nodeValue.trim() === taskText) {
            alert("Task already exists!");
            return;
        }
    }

    let li = document.createElement("li");
    li.textContent = taskText;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "editBtn";
    editBtn.onclick = function () {
        const currentText = li.firstChild.nodeValue.trim();
        const newText = prompt("Edit your task:", currentText);

        if (newText && newText.trim() !== "") {
            const trimmedNewText = newText.trim();

            //existing logic for checking duplicates
            for (let i = 0; i < tasks.length; i++) {
                const otherText = tasks[i].childNodes[0].nodeValue.trim();
                if (tasks[i] !== li && otherText === trimmedNewText) {
                    alert("Task already exists!");
                    return;
                }
            }
            li.firstChild.nodeValue = trimmedNewText;
            saveData();
        }
    };
    li.appendChild(editBtn);
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.onclick = function () {
        li.remove();
        saveData();
    };
    li.appendChild(deleteBtn);
    listContainer.appendChild(li);
    inputBox.value = "";
    setAlertMessage("Todo item Created Successfully!");
    saveData();

    //li.innerHTML = inputBox.value + ' <button class="deleteBtn" onclick="deleteTask(this)">Delete</button>';
    // li.innerHTML = inputBox.value;
    // listContainer.appendChild(li);

    // let span = document.createElement("span");
    // span.innerHTML = "\u00d7";
    // li.appendChild(span);
    // inputBox.value = ""; // Clear the input box after adding a task
    // setAlertMessage("Todo item Created Successfully!");
    // saveData(); // Save the current state of the list to local storage
}

listContainer.addEventListener(
    "click",
    function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        }
        // else if (e.target.tagName === "SPAN") {
        //     e.target.parentElement.remove();
        //     saveData();
        // }
    },
    false
);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function setAlertMessage(message) {
    console.log(message);
}
