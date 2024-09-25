class Project {
    #todoItems = [];
    domElement;

    constructor(name) {
        this.name = name;
        this.createDomElement();
    }
    
    createDomElement() {
        const domElement = document.createElement("div");
        domElement.className = "project";
        domElement.textContent = this.name;
        domElement.self = this;

        this.domElement = domElement;
    }

    getItems() {
        return this.#todoItems;
    }

    addItem(newItem) {
        this.#todoItems.push(newItem);
    }
}

class TodoItem {
    desc = "";
    dueDate = "";
    priority = "";
    domElement;
    complete = false;
    
    constructor(name) {
        this.name = name;
        this.createDomElement();
    }

    createDomElement() {
        const itemElement = document.createElement("div");
        itemElement.className = "todoItem";
        itemElement.textContent = this.name;
        itemElement.self = this;

        this.domElement = itemElement;
    }
}

export {Project, TodoItem};