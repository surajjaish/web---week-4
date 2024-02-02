document.addEventListener("DOMContentLoaded", function () {
  // Load tasks from local storage
  loadTasks();

  // Event listener for the "Add Task" button
  document
    .getElementById("taskInput")
    .addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
});

function addTask() {
  // Get the input value
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    // Create a task object
    const task = { text: taskText, completed: false };

    // Add the task to the task list
    addTaskToList(task);

    // Save tasks to local storage
    saveTasks();

    // Clear the input field
    taskInput.value = "";
  }
}

function addTaskToList(task) {
  // Create a new task element
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  // Add task text to the list item
  li.innerHTML = `
        <span class="${
          task.completed ? "completed" : ""
        }" onclick="toggleCompleted(this)">${task.text}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

  // Append the list item to the task list
  taskList.appendChild(li);
}

function editTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector("span").innerText;

  // Ask the user for a new task text
  const newTaskText = prompt("Edit task:", taskText);

  if (newTaskText !== null) {
    li.querySelector("span").innerText = newTaskText;

    // Save tasks to local storage
    saveTasks();
  }
}

function deleteTask(button) {
  const li = button.parentElement;

  // Remove the task from the task list
  li.remove();

  // Save tasks to local storage
  saveTasks();
}

function toggleCompleted(span) {
  // Toggle the completed class
  span.classList.toggle("completed");

  // Save tasks to local storage
  saveTasks();
}

function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = [];

  // Convert task list to an array of task objects
  taskList.querySelectorAll("li").forEach(function (li) {
    const taskText = li.querySelector("span").innerText;
    const completed = li.querySelector("span").classList.contains("completed");

    tasks.push({ text: taskText, completed: completed });
  });

  // Save tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById("taskList");

  // Retrieve tasks from local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add each task to the task list
  tasks.forEach(function (task) {
    addTaskToList(task);
  });
}
