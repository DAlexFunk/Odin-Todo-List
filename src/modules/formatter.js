const Formatter = {
    clearTarget: function(target) {
        while(target.firstChild) {
            target.removeChild(target.lastChild);
        }
    },

    displayProjList: function(list) {
        const projList = document.querySelector("div#projects");
        
        Formatter.clearTarget(projList);
        list.forEach((proj) => projList.appendChild(proj.domElement));
    },

    updateSelectedProject: function(activeProject) {
        const todoItems = document.querySelector("div#todoItems");
        const currentProjectText = document.querySelector("h1#currentProjectText")
        currentProjectText.textContent = activeProject.self.name;
        Formatter.displayTodoItems(activeProject);
    },

    displayTodoItems: function(project) {
        const todoItemsList = document.querySelector("div#todoItems");
        const todoItems = project.self.getItems();

        Formatter.clearTarget(todoItemsList);
        todoItems.forEach((item) => todoItemsList.appendChild(item.domElement));
    }
}

export {Formatter};