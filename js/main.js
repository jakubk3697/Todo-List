let $todoInput;
let $addBtn;
let $taskList;
let $emptyInpErr;

let $popup;
let $popupInfo;
let $popupInput;
let $popupBtnAccept;
let $popupBtnCancel;

let $edditedTaskText;
let $edditedTaskId;
let $newTask;
let $taskIndex = 0;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  $todoInput = document.querySelector(".todoInput");
  $addBtn = document.querySelector(".addBtn");
  $taskList = document.querySelector(".taskList");
  $popup = document.querySelector(".popup");
  $popupInfo = document.querySelector(".popupInfo");
  $popupInput = document.querySelector(".popupInput");
  $popupBtnAccept = document.querySelector(".accept");
  $popupBtnCancel = document.querySelector(".cancel");
  $emptyInpErr = document.querySelector(".emptyInpErr");
};
const prepareDOMEvents = () => {
  document.body.addEventListener("keyup", escapePopup);
  $todoInput.addEventListener("keyup", enterAddTask);
  $popupBtnAccept.addEventListener("click", addEditTask);
  $popupBtnCancel.addEventListener("click", closePopup);
  $addBtn.addEventListener("click", addTask);
  $taskList.addEventListener("click", checkClick);
};

const createTaskPanel = (e) => {
  const toolsPanel = document.createElement("div");
  toolsPanel.classList.add("tools");
  $newTask.appendChild(toolsPanel);

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete");
  completeBtn.innerHTML = `<i class="fas fa-check"></i>`;

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.textContent = "EDIT";

  const delTaskBtn = document.createElement("button");
  delTaskBtn.classList.add("delete");
  delTaskBtn.innerHTML = `<i class="fas fa-times"></i>`;

  toolsPanel.appendChild(completeBtn);
  toolsPanel.appendChild(editBtn);
  toolsPanel.appendChild(delTaskBtn);
};

const checkClick = (e) => {
  const value = e.target.closest("button").className;
  if (value === "complete") {
    doneTask(e);
  } else if (value === "edit") {
    editTask(e);
  } else {
    deleteTask(e);
  }
};

const addTask = (e) => {
  if ($todoInput.value.length > 3) {
    $taskIndex++;
    $newTask = document.createElement("li");
    $newTask.textContent = $todoInput.value;
    $newTask.setAttribute("id", `todo-${$taskIndex}`);
    $taskList.appendChild($newTask);
    $emptyInpErr.style.display = "none";
    createTaskPanel(e);
  } else {
    $emptyInpErr.style.display = "block";
  }
  $todoInput.value = "";
  $popup.style.display = "none";
};

const editTask = (e) => {
  const prevTask = e.target.closest("li");
  $edditedTaskText = prevTask.textContent.split("EDIT")[0];
  $popupInput.value = $edditedTaskText;
  $edditedTaskId = prevTask.getAttribute("id");
  $popup.style.display = "flex";
};

const closePopup = () => {
  $popup.style.display = "none";
  $popupInput.value = "";
};

const addEditTask = (e) => {
  $popupInput.vlaue = "";
  if ($popupInput.value.length > 3) {
    let taskToUpdate = document.getElementById($edditedTaskId);
    taskToUpdate.firstChild.textContent = $popupInput.value;
    $popup.style.display = "none";
  }
};

const deleteTask = (e) => {
  e.target.closest("li").remove();
};

const doneTask = (e) => {
  e.target.closest("li").classList.toggle("completed");
  e.target.closest("button").firstElementChild.classList.toggle("icoCompleted");
};

const enterAddTask = (e) => {
  if (e.keyCode === 13) {
    addTask(e);
  }
};

const escapePopup = (e) => {
  if (e.keyCode === 27) {
    $popup.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", main);
