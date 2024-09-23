import "./styles.css";
import { Project } from "./modules/project";
import { Formatter } from "./modules/formatter";

const projList = [new Project("proj1"), new Project("proj2"), new Project("proj3")];

Formatter.displayProjList(projList);