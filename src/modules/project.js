import { Formatter } from "./formatter";

class Project {
    todoItems = [];
    domElement;

    constructor(name) {
        this.name = name;
        this.createDomElement();
    }

    createDomElement() {
        const domElement = document.createElement("div");
        domElement.className = "project";
        domElement.textContent = this.name;
        domElement.getParentFromList = function(list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].domElement === this) {
                    return list[i];
                }
            }
        };

        const removeButton = document.createElement("button");
        removeButton.id = "projectRemove";
        removeButton.textContent = "X";
        removeButton.addEventListener("click", (evt) => {
            this.domElement.remove();
            document.projList.splice(document.projList.indexOf(this), 1);
            Formatter.displayProjList(document.projList);
            Formatter.clearTarget(document.querySelector("div#todoItems"));
            document.querySelector("h1#currentProjectText").textContent = "No Project Selected";
            evt.stopPropagation();
        });
        domElement.appendChild(removeButton);

        this.domElement = domElement;
    }

    getItems() {
        return this.todoItems;
    }

    addItem(newItem) {
        this.todoItems.push(newItem);
    }

    removeItem(index) {
        this.todoItems.splice(index, 1);
    }
}

class TodoItem {
    desc = "";
    dueDate = "";
    priority = "";
    domElement = null;
    complete = false;
    
    constructor(name, project) {
        this.name = name;
        this.project = project;
        this.createDomElement();
    }

    createDomElement() {
        const domElement = document.createElement("div");
        domElement.className = "todoItem";
        domElement.textContent = this.name;
        domElement.getParentFromList = function(list) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].domElement === this) {
                    return list[i];
                }
            }
        };

        const removeButton = document.createElement("button");
        removeButton.id = "projectRemove";
        removeButton.textContent = "X";
        removeButton.addEventListener("click", (evt) => {
            this.domElement.remove();
            this.project.removeItem(this.project.getItems().indexOf(this));
            Formatter.displayTodoItems(this.project);
            Formatter.clearTarget(document.querySelector("div#currentItem"));
            evt.stopPropagation();
        });
        domElement.appendChild(removeButton);

        this.domElement = domElement;
    }
}

export {Project, TodoItem};