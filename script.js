const inputField = document.querySelector(".input_field");
const taskList = document.querySelector(".task_list");

//function to add a task
function addTask() {
  if (inputField.value === "") {
    alert("You must write something First!");
  } else {
    //Create tasks under the task-list
    let li = document.createElement("li");
    let task = document.createElement("i");

    li.classList.add("tasks");

    task.innerHTML = inputField.value;
    taskList.appendChild(li);
    li.appendChild(task);

    // Make the created <li> element draggable
    li.draggable = true;

    // span for removing tasks
    let span = document.createElement("span");
    span.innerHTML = "&#10006";
    li.appendChild(span);
  }
  inputField.value = "";

  save();
}

// Event delegation: Attaching the event listeners to a parent element
document.addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("tasks")) {
    e.target.classList.add("dragging");
  }
});

//function to remove the dragging class after dragend
document.addEventListener("dragend", function (e) {
  if (e.target.classList.contains("tasks")) {
    e.target.classList.remove("dragging");
  }
});

//sorting list

// Event delegation: Attaching the event listeners to a parent element
document.addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("tasks")) {
    e.target.classList.add("dragging");
  }
});

document.addEventListener("dragend", function (e) {
  if (e.target.classList.contains("tasks")) {
    e.target.classList.remove("dragging");
  }
});

function initSortableList() {
  taskList.addEventListener("dragover", function (e) {
    e.preventDefault();

    // Find the dragging item
    const draggingItem = document.querySelector(".dragging");
    if (!draggingItem) return;

    // Find the item over which the user is hovering
    const hoveredItem = e.target.closest(".tasks");
    if (!hoveredItem) return;

    // Prevent sorting if dragging over itself
    if (hoveredItem === draggingItem) return;

    // Calculate the position of the cursor relative to the hovered item
    const bounding = hoveredItem.getBoundingClientRect();
    const offset = e.clientY - bounding.top;

    // Determine the position to insert the dragging item
    const next =
      offset > bounding.height / 2 ? hoveredItem.nextSibling : hoveredItem;

    // Reorder the task list by moving the dragging item before or after the hovered item
    taskList.insertBefore(draggingItem, next);
  });
}

// Call initSortableList to initialize sortable list functionality
initSortableList();

//toggle task complete and delete function
taskList.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      save();
    } else if (
      e.target.tagName === "I" &&
      e.target.parentElement.tagName === "LI"
    ) {
      e.target.parentElement.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      save();
    }
  },
  false
);

// Save data to the localstorage
function save() {
  localStorage.setItem("data", taskList.innerHTML);
}

// doad data from the localstorage
function load() {
  taskList.innerHTML = localStorage.getItem("data");
}

load();
