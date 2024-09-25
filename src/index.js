import "./styles.css";
import { Project, TodoItem } from "./modules/project";
import { Formatter } from "./modules/formatter";

const addButton = document.querySelector("button#add");
const projNameInput = document.querySelector("input#newProjectName");
let projects = document.querySelectorAll("div.project");
let activeProject = document.querySelector("div.project.active");
const addTodoButton = document.querySelector("button#addTodo");
const todoNameInput = document.querySelector("input#newTodoItem");
let todoItems = document.querySelectorAll("div.todoItem");
let activeTodoItem = document.querySelector("div.todoItem.active");
const currentItemArea = document.querySelector("div#currentItem");

function addNewProject() {
    if (!projNameInput.value) return;

    const newProj = new Project(projNameInput.value);
    projNameInput.value = "";
    document.projList.push(newProj);

    Formatter.displayProjList(document.projList);
    projects = document.querySelectorAll("div.project");
    projects.forEach((proj) => proj.addEventListener("click", selectProject));
}

function selectProject(evt) {
    todoItems.forEach((item) => item.className = "todoItem");
    projects.forEach((proj => proj.className = "project"));
    evt.currentTarget.className = "project active";
    activeProject = evt.currentTarget;
    
    Formatter.updateSelectedProject(activeProject);
    Formatter.clearTarget(currentItemArea);
    todoItems = document.querySelectorAll("div.todoItem");
}

function addTodoItem() {
    if (activeProject && todoNameInput.value) {
        const newTodo = new TodoItem(todoNameInput.value);
        todoNameInput.value = "";
        activeProject.self.addItem(newTodo);

        Formatter.displayTodoItems(activeProject);
        todoItems = document.querySelectorAll("div.todoItem");
        todoItems.forEach((item) => item.addEventListener("click", selectTodoItem));
    }
}

function selectTodoItem(evt) {
    todoItems.forEach((item) => item.className = item.className.replace("active", ""));
    evt.currentTarget.className += " active";
    activeTodoItem = evt.currentTarget;

    Formatter.updateTodoItem(activeTodoItem.self);
}

document.projList = [];

projects.forEach((proj) => proj.addEventListener("click", (evt) => evt.currentTarget.className = "project active"));
addButton.addEventListener("click", addNewProject);
addTodoButton.addEventListener("click", addTodoItem);