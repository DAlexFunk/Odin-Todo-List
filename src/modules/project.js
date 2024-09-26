import { Formatter } from "./formatter";

class Project {
    domElement;

    constructor(name, todoItems) {
        this.name = name;
        this.todoItems = todoItems;
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
            // Formatter.clearTarget()
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
    
    constructor(name) {
        this.name = name;
        this.createDomElement();
    }

    loadFromStorage(desc, dueDate, priority, complete) {
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = complete;
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
            const project = this.getParentProjectFromList(document.projList);
            project.removeItem(project.getItems().indexOf(this));
            Formatter.displayTodoItems(project);
            Formatter.clearTarget(document.querySelector("div#currentItem"));
            evt.stopPropagation();
        });
        domElement.appendChild(removeButton);

        this.domElement = domElement;
    }

    getParentProjectFromList(list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].todoItems.includes(this)) return list[i];
        }
        return false;
    }
}

export {Project, TodoItem};