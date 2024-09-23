class Project {
    #items = [];
    
    constructor(name) {
        this.name = name;
    }

    getItems() {
        return this.#items;
    }

    addItem(newItem) {
        this.#items.push(newItem);
    }
}

export {Project};