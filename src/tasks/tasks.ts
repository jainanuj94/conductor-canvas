import { humanTask } from "./humanTask.ts";
import { simpleTask } from "./simpleTask.ts";
import { switchTask } from "./swtichTask.ts";
import {Task} from "../types/Workflow.ts";

export const tasks: Task[] = [humanTask, simpleTask, switchTask];
