const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const editForm = document.getElementById("edit-form");
const editTaskInput = document.getElementById("edit-task-input");
const saveEditButton = document.getElementById("save-edit");
const cancelEditButton = document.getElementById("cancel-edit");

let tasks = [];
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : 'pending'}">${task.text}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="toggleCompletion(${index})">Mark ${task.completed ? 'Pending' : 'Completed'}</button>
        `;
        taskList.appendChild(li);
    });
	createTaskButtonCount++;
    updateCreateTaskButtonCount();
	saveTasksToLocalStorage();
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        taskInput.value = "";
        renderTasks();
    }
}

function editTask(index) {
    editTaskInput.value = tasks[index].text;
    editForm.style.display = "block";

    saveEditButton.onclick = () => {
        const editedTaskText = editTaskInput.value.trim();
        if (editedTaskText !== "") {
            tasks[index].text = editedTaskText;
            editForm.style.display = "none";
            renderTasks();
        }
    };

    cancelEditButton.onclick = () => {
        editForm.style.display = "none";
    };
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}
function updateCreateTaskButtonCount() {
    // Update the create task button count using CountAPI
    fetch('https://api.countapi.xyz/update/Task_manager/addTaskButton?amount=' + createTaskButtonCount)
        .then(response => response.json())
        .then(data => {
            console.log('Create Task Button Count: ' + data.value);
        });
}


addTaskButton.addEventListener("click", addTask);
loadTasksFromLocalStorage();
renderTasks();
