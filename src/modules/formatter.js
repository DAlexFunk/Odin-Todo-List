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
        const todoItems = document.querySelectorAll("div.todoItem");
        const currentProjectText = document.querySelector("h1#currentProjectText")
        currentProjectText.textContent = activeProject.name;
        Formatter.displayTodoItems(activeProject);
    },

    displayTodoItems: function(project) {
        const todoItemsList = document.querySelector("div#todoItems");
        const todoItems = project.getItems();

        Formatter.clearTarget(todoItemsList);
        todoItems.forEach((item) => {
            todoItemsList.appendChild(item.domElement);
            if (item.complete) {
                item.domElement.className += " complete";
            }
        });
    },

    updateTodoItem: function(todoItem) {
        const currentItemArea = document.querySelector("div#currentItem");
        Formatter.clearTarget(currentItemArea);

        const itemTitle = document.createElement("h1");
        itemTitle.textContent = todoItem.name;
        currentItemArea.appendChild(itemTitle);

        const dueDate = document.createElement("div");
        dueDate.id = "dueDate";

        const dueDateLabel = document.createElement("label")
        dueDateLabel.for = "dueDate";
        dueDateLabel.textContent = "Due: ";
        dueDate.appendChild(dueDateLabel);

        const dueDateInput = document.createElement("input");
        dueDateInput.type = "date";
        dueDateInput.id = "dueDateInput";
        dueDateInput.value = todoItem.dueDate;
        dueDate.appendChild(dueDateInput);
        currentItemArea.appendChild(dueDate);


        const priority = document.createElement("div");
        priority.id = "priority";

        const priorityLabel = document.createElement("label");
        priorityLabel.for = "priorityInput";
        priorityLabel.textContent = "Priotity: ";
        priority.appendChild(priorityLabel);

        const priorityInput = document.createElement("select");
        priorityInput.id = "priorityInput";
        priorityInput.defauvalue = "high"

        const options = ["low", "mid", "high"];
        for (let option of options) {
            const choice = document.createElement("option");
            choice.value = option;
            choice.textContent = option.charAt(0).toUpperCase() + option.slice(1);
            if (option === todoItem.priority) {choice.setAttribute("selected", true)};
            priorityInput.appendChild(choice);
        }
        priority.appendChild(priorityInput);
        currentItemArea.appendChild(priority);


        const desc = document.createElement("div");
        desc.id = "description";

        const descLabel = document.createElement("label");
        descLabel.for = "descriptionInput";
        descLabel.textContent = "Description: ";
        desc.appendChild(descLabel);

        const descInput = document.createElement("textarea");
        descInput.id = "descriptionInput";
        descInput.value = todoItem.desc;
        desc.appendChild(descInput);
        currentItemArea.appendChild(desc);

        const submitButton = document.createElement("button");
        submitButton.id = "todoSubmit";
        submitButton.textContent = "Update";
        submitButton.addEventListener("click", () => {
            todoItem.dueDate = dueDateInput.value;
            todoItem.priority = priorityInput.value;
            todoItem.desc = descInput.value;
        })
        currentItemArea.appendChild(submitButton);

        const finishButton = document.createElement("button");
        finishButton.id = "finishButton";
        finishButton.textContent = "Finish";
        finishButton.addEventListener("click", () => {
            if (todoItem.complete) {
                todoItem.domElement.className = todoItem.domElement.className.replace(" complete", "");
                todoItem.complete = false;
            } else {
                todoItem.domElement.className += " complete";
                todoItem.complete = true;
            }
        })

        currentItemArea.appendChild(finishButton);
    }
}

export {Formatter};