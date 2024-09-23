const Formatter = {
    clearTarget: function(target) {
        while(target.firstChild) {
            target.removeChild(target.lastChild);
        }
    },

    displayProjList: function(list) {
        const projList = document.querySelector("div#projects");
        
        Formatter.clearTarget(projList);
        for (const proj of list) {
            const newProj = document.createElement("div");
            newProj.className = "project";
            newProj.textContent = proj.name;
            projList.appendChild(newProj);
        }
    }
}

export {Formatter};