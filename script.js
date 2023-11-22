const inputField = document.querySelector(".input_field");
const taskList = document.querySelector(".task_list");

//function to add a task
function addTask() {
  if (inputField.value === "") {
    alert("You must write something First!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputField.value;
    taskList.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "&#10006";
    li.appendChild(span);
  }
  inputField.value = "";
  save();
}

//toggle task compleet and delete function
taskList.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      save();
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
