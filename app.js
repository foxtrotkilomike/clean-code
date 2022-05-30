const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementsByTagName("button")[0]; //first button
const incompleteTaskHolder = document.getElementById("incompleted-tasks-list"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks-list"); //completed-tasks

// New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button"); //delete button
  const deleteButtonImg = document.createElement("img"); //delete button image

  listItem.classList.add("task-item");
  label.innerText = taskString;
  label.classList.add("task", "task-label");

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");
  editInput.type = "text";
  editInput.classList.add("task", "text-input");

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.classList.add("edit-button", "button");

  deleteButton.classList.add("delete-button", "button");
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

// Edit existing task
const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".text-input");
  const label = listItem.querySelector(".task-label");
  const editBtn = listItem.querySelector(".edit-button");
  const containsClass = listItem.classList.contains("edit-task-item");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to edit mode
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-task-item");
  label.classList.toggle("edit-task-label");
};

//Delete task
const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
const taskCompleted = function () {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  const itemLabel = listItem.querySelector('.task-label');
  itemLabel.classList.add('task-label-complete');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  const itemLabel = listItem.querySelector('.task-label');
  itemLabel.classList.remove('task-label-complete');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//The glue to hold it all together.

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector(".checkbox");
  const editButton = taskListItem.querySelector(".edit-button");
  const deleteButton = taskListItem.querySelector(".delete-button");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
