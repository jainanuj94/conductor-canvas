import * as _ from 'lodash';
import {dagre} from "dagre-d3";
import {Task, Workflow} from "../types/Workflow";

export type NodeData = {
    aliasForRef: string;
    class?: string;
    height: number;
    label?: string;
    name: string;
    padding?: number;
    paddingX?: number;
    paddingY?: number;
    ref: string;
    rx?: number;
    ry?: number;
    shape?: string;
    type: string;
    width: number;
    x: number;
    y: number;
}
export default class WorkflowDAG {
    private graph: dagre.graphlib.Graph<NodeData>;
    private workflowDef: Workflow;

    constructor(workflowDef) {
        this.workflowDef = workflowDef;

        this.graph = new dagre.graphlib.Graph<NodeData>({directed: true, compound: false});

        this.constructGraph();
    }

    constructGraph() {
        const {workflowDef} = this;

        // Definition Only
        if (workflowDef) {
            this.defToGraph(workflowDef);
        } else {
            throw new Error(
                "Must pass workflowDef in constructor"
            );
        }
    }

    fetchGraph() : dagre.graphlib.Graph<NodeData> {
        return this.graph
    }
    defToGraph(workflowDef) {
        const definedTasks = [...workflowDef.tasks];

        definedTasks.unshift({
            type: "TERMINAL",
            name: "start",
            taskReferenceName: "__start",
        });

        definedTasks.push({
            type: "TERMINAL",
            name: "final",
            taskReferenceName: "__final",
        });

        // Recursively process tasks
        this.processTaskList(definedTasks, []);

        // All branches are terminated by a user-defined 'TERMINATE' task.
        if (_.isEmpty(this.graph.inEdges("__final"))) {
            this.graph.removeNode("__final");
        }
    }

    addVertex(taskConfig, antecedents) {
        const vertex = {
            label: taskConfig.name,
            name: taskConfig.name,
            ref: taskConfig.taskReferenceName,
            type: taskConfig.type,
            aliasForRef: taskConfig.aliasForRef,
            ...taskConfig
        };

        this.graph.setNode(taskConfig.taskReferenceName, vertex);
        console.log(this.graph);
        for (const antecedent of antecedents) {

            const edgeParams = {};

            this.graph.setEdge(
                antecedent.taskReferenceName,
                taskConfig.taskReferenceName,
                edgeParams
            );
        }
    }

    processTaskList(tasks, antecedents) {
        console.assert(Array.isArray(antecedents));

        let currAntecedents = antecedents;
        for (const task of tasks.values()) {
            currAntecedents = this.processTask(task, currAntecedents);
        }

        return currAntecedents;
    }

    // Nodes are connected to previous
    processSwitchTask(decisionTask, antecedents) {
        console.assert(Array.isArray(antecedents));
        const retval = [];

        this.addVertex(decisionTask, antecedents);

        if (_.isEmpty(decisionTask.defaultCase)) {
            retval.push(decisionTask); // Empty default path
        } else {
            retval.push(
                ...this.processTaskList(decisionTask.defaultCase, [decisionTask])
            );
        }

        retval.push(
            ..._.flatten(
                Object.entries(decisionTask.decisionCases).map(([, tasks]) => {
                    return this.processTaskList(tasks, [decisionTask]);
                })
            )
        );

        return retval;
    }

    processForkJoinDynamic(dfTask, antecedents) {
        console.assert(Array.isArray(antecedents));

        // This is the DF task (dotted bar) itself.
        this.addVertex(dfTask, antecedents);
    }

    getRefTaskChilds(task) {
        switch (task.type) {
            case "FORK_JOIN_DYNAMIC":
            case "FORK_JOIN": {
                const outerForkTasks = task.forkTasks || [];
                return _.flatten(
                    outerForkTasks.map((innerForkTasks) =>
                        innerForkTasks.map((tasks) => tasks)
                    )
                );
            }

            case "DECISION": // DECISION is deprecated and will be removed in a future release
            case "SWITCH": {
                const retval = [];
                if (!_.isEmpty(task.defaultCase)) {
                    retval.push(...this.getRefTask(task.defaultCase));
                }
                retval.push(
                    ..._.flatten(
                        Object.entries(task.decisionCases).map(([caseValue, tasks]) => {
                            return tasks;
                        })
                    )
                );
                return retval;
            }

            case "DO_WHILE": {
                return task.loopOver;
            }

            /*
            case "TERMINATE":
            case "JOIN":
            case "TERMINAL":
            case "EVENT":
            case "SUB_WORKFLOW":
            case "EXCLUSIVE_JOIN":
            */
            default: {
                return [];
            }
        }
    }

    getRefTask(task) {
        const taskRefs = this.getRefTaskChilds(task)
            .map((t) => {
                return this.getRefTask(t);
            })
            .reduce((r, tasks) => {
                return r.concat(tasks);
            }, []);
        return [task].concat(taskRefs);
    }

    processDoWhileTask(doWhileTask: Task, antecedents) {
        console.assert(Array.isArray(antecedents));

        this.addVertex(doWhileTask, antecedents);

        // Bottom bar
        // aliasForRef indicates when the bottom bar is clicked one we should highlight the ref
        const endDoWhileTask = {
            type: "DO_WHILE_END",
            name: doWhileTask.name,
            taskReferenceName: doWhileTask.taskReferenceName + "-END",
            aliasForRef: doWhileTask.taskReferenceName,
        };
        this.getRefTask(doWhileTask).map(
            (t) => t.taskReferenceName
        );
        // Definition view (or not executed)
        this.processTaskList(doWhileTask.loopOver, [doWhileTask]);

        const lastLoopTask = _.last(doWhileTask.loopOver);

        // Connect the end of each case to the loop end
        if (
            lastLoopTask?.type === "SWITCH" ||
            lastLoopTask?.type === "DECISION"
        ) {
            Object.entries(lastLoopTask.decisionCases).forEach(
                ([caseValue, tasks]) => {
                    const lastTaskInCase = _.last(tasks);
                    this.addVertex(endDoWhileTask, [lastTaskInCase]);
                }
            );
        }

        // Default case
        this.addVertex(endDoWhileTask, [lastLoopTask]);

        // Create reverse loop edge
        this.graph.setEdge(
            doWhileTask.taskReferenceName,
            doWhileTask.taskReferenceName + "-END"
        );

        return [endDoWhileTask];
    }

    processForkJoin(forkJoinTask, antecedents) {
        const outerForkTasks = forkJoinTask.forkTasks || [];

        // Add FORK_JOIN task itself (solid bar)
        this.addVertex(forkJoinTask, antecedents);

        // Each sublist is executed in parallel. Tasks within sublist executed sequentially
        return _.flatten(
            outerForkTasks.map((innerForkTasks) =>
                this.processTaskList(innerForkTasks, [forkJoinTask])
            )
        );
    }

    processJoin(joinTask, antecedents) {
        // Process as a normal node UNLESS in special case of an externalized dynamic-fork. In which case - backfill spawned children.
        this.addVertex(joinTask, antecedents);

        return [joinTask];
    }

    // returns tails = [...]
    processTask(task, antecedents) {
        switch (task.type) {
            case "FORK_JOIN": {
                return this.processForkJoin(task, antecedents);
            }

            case "FORK_JOIN_DYNAMIC": {
                return this.processForkJoinDynamic(task, antecedents);
            }

            case "DECISION": // DECISION is deprecated and will be removed in a future release
            case "SWITCH": {
                return this.processSwitchTask(task, antecedents);
            }

            case "TERMINATE": {
                this.addVertex(task, antecedents);
                return [];
            }

            case "DO_WHILE": {
                return this.processDoWhileTask(task, antecedents);
            }

            case "JOIN": {
                return this.processJoin(task, antecedents);
            }
            /*
            case "TERMINAL":
            case "EVENT":
            case "SUB_WORKFLOW":
            case "EXCLUSIVE_JOIN":
            */
            default: {
                this.addVertex(task, antecedents);
                return [task];
            }
        }
    }
}

/*

Node {
  taskResults: [... TaskResult]
}

TaskResult {
  ...[Task Result fields only present if executed],
  workflowTask: {
    ... Always populated
  }
}

*/
