//setting up variables
let input = document.querySelector(".input");
let submitBtn = document.querySelector(".fa-plus");
let tasksContainer = document.querySelector(".tasks-container");
let allTasks = document.querySelector(".all span");
let completed = document.querySelector(".done span");

//..............................................................
// setting task markup using DOM

window.onload = function () {
  input.focus();
};

submitBtn.onclick = function () {
  if (input.value === "") {
    console.log("Empty");
  } else {
    let mainDiv = document.createElement("div");
    mainDiv.className = "task";
    let subDivOne = document.createElement("div");
    subDivOne.className = "value";
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

    subDivOne.innerHTML = input.value;
    input.value = "";
    input.focus();

    allTasks.innerHTML = document.querySelectorAll(".task").length;
    completed.innerHTML = document.querySelectorAll(".finished").length;
  }
};

document.addEventListener("click", function (e) {
  if (e.target.className == `fa-solid fa-check-double`) {
    e.target.parentElement.parentElement.parentElement
      .getElementsByClassName("value")[0]
      .classList.toggle("finished");
    completed.innerHTML = document.querySelectorAll(".finished").length;
  }

  if (e.target.className == `fa-solid fa-trash`) {
    e.target.parentElement.parentElement.parentElement.remove();
    allTasks.innerHTML = document.querySelectorAll(".task").length;
  }
});
