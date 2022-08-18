//....................... SettingUP Variables
let input = document.querySelector(".input");
let submitBtn = document.querySelector(".fa-plus");
let tasksContainer = document.querySelector(".tasks-container");
let allTasks = document.querySelector(".all span");
let completed = document.querySelector(".done span");
let deleteAllTasks = document.querySelector(".del-all");

window.onload = function () {
  input.focus();
  completed.innerHTML = document.querySelectorAll(".finished").length;
};

let arrOfTasks = [];

if (window.localStorage.getItem("task")) {
  arrOfTasks = JSON.parse(window.localStorage.getItem("task"));
}

if (window.localStorage.getItem("functionalty-one")) {
  allTasks.innerHTML = window.localStorage.getItem("functionalty-one");
}
if (window.localStorage.getItem("functionality-two")) {
  completed.innerHTML = window.localStorage.getItem("functionality-two");
}

addLocalStorageDataIntoPage();

submitBtn.onclick = function () {
  if (input.value !== "") {
    addtaskstoArr(input.value);
  }

  input.value = "";
};

tasksContainer.addEventListener("click", (e) => {
  if (e.target.className == `fa-solid fa-check-double`) {
    e.target.parentElement.parentElement.parentElement.children[0].classList.toggle(
      "finished"
    );
    finishingTaskWith(
      e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    );
    completed.innerHTML = document.querySelectorAll(".finished").length;
    window.localStorage.setItem("functionality-two", completed.innerHTML);
  }

  if (e.target.className == `fa-solid fa-trash`) {
    e.target.parentElement.parentElement.parentElement.remove();
    deleteDivInLocalStorage(
      e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    );
    allTasks.innerHTML = document.querySelectorAll(".task").length;
    window.localStorage.setItem("functionalty-one", allTasks.innerHTML);
  }
});

function addtaskstoArr(taskText) {
  let task = {
    id: Date.now(),
    Content: taskText,
    completed: false,
  };
  arrOfTasks.push(task);
  addAllTasksToPageFrom(arrOfTasks);
  addTasksToLocalStorageFrom(arrOfTasks);
}

function addAllTasksToPageFrom(arrOfTasks) {
  tasksContainer.innerHTML = "";
  arrOfTasks.forEach((task) => {
    let mainDiv = document.createElement("div");
    mainDiv.className = "task";
    mainDiv.setAttribute("data-id", task.id);
    let subDivOne = document.createElement("div");
    subDivOne.className = "value";
    subDivOne.textContent = task.Content;
    if (task.completed === true) {
      subDivOne.className = "value finished";
    }
    let subDivTwo = document.createElement("div");
    subDivTwo.className = "icons";
    let sapnIconOne = document.createElement("span");
    sapnIconOne.className = "icon-One";
    sapnIconOne.innerHTML = `<i class="fa-solid fa-check-double"></i>`;
    let sapnIconTwo = document.createElement("span");
    sapnIconTwo.className = "icon-Two";
    sapnIconTwo.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    // append each one in the right place
    tasksContainer.appendChild(mainDiv);
    mainDiv.appendChild(subDivOne);
    subDivTwo.appendChild(sapnIconOne);
    subDivTwo.appendChild(sapnIconTwo);
    mainDiv.appendChild(subDivTwo);

    allTasks.innerHTML = document.querySelectorAll(".task").length;
    completed.innerHTML = document.querySelectorAll(".finished").length;

    window.localStorage.setItem("functionalty-one", allTasks.innerHTML);
    window.localStorage.setItem("functionality-two", completed.innerHTML);

    input.focus();
  });
}

function addTasksToLocalStorageFrom(arrOfTasks) {
  window.localStorage.setItem("task", JSON.stringify(arrOfTasks));
}

function addLocalStorageDataIntoPage() {
  let data = window.localStorage.getItem("task");

  if (data) {
    let tas = JSON.parse(data);
    addAllTasksToPageFrom(tas);
  }
}

function deleteDivInLocalStorage(taskid) {
  arrOfTasks = arrOfTasks.filter((task) => task.id != taskid);
  addTasksToLocalStorageFrom(arrOfTasks);
}

function finishingTaskWith(taskid) {
  for (let i = 0; i < arrOfTasks.length; i++) {
    if (arrOfTasks[i].id == taskid) {
      arrOfTasks[i].completed == false
        ? (arrOfTasks[i].completed = true)
        : (arrOfTasks[i].completed = false);
    }
    addTasksToLocalStorageFrom(arrOfTasks);
  }
}

deleteAllTasks.onclick = function () {
  tasksContainer.innerHTML = "";
  window.localStorage.removeItem("task");
  window.localStorage.removeItem("functionalty-one");
  window.localStorage.removeItem("functionalty-two");
  allTasks.innerHTML = document.querySelectorAll(".task").length;
  completed.innerHTML = document.querySelectorAll(".finished").length;

  window.location.reload();
};
