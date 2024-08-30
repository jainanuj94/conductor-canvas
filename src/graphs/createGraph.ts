import {Task, Workflow} from "../types/Workflow.ts";
import {Edge, Node} from "@xyflow/react";
import {Graph} from "../types/Graph.ts";

const preprocessTasks = (workflow: Workflow): Workflow => {
    workflow.tasks.unshift({
        name: "startNode",
        taskReferenceName: "startNodeRef",
        type: "startNode",
    });
    workflow.tasks.push({
        name: "terminateNode",
        taskReferenceName: "terminateNodeRef",
        type: "terminateNode",
    });
    return workflow;
};

export const createGraph = (workflow: Workflow): Graph => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const fetchId = (type: string, index: number) => `${type}-${index}`;

    const processedWorkflow = preprocessTasks(workflow);
    const processTask = (task: Task, index: number, parentId?: string, edgeLabel?: string, sourceHandle?: string) => {
        const nodeId = fetchId(task.type, index);
        const position = {x: 250, y: nodes.length * 100};

        const node: Node = {
            id: nodeId,
            type: task.type,
            position,
            data: task,
        };

        nodes.push(node);

        if (parentId) {
            let edge: Edge = {
                id: `edge-${parentId}-${nodeId}`,
                source: parentId,
                target: nodeId,
                label: edgeLabel ? edgeLabel : ""
            };
            if (sourceHandle){
                edge = {sourceHandle: sourceHandle, ...edge}
            }
            edges.push(edge);
        }

        if (task.type === "SWITCH" && task.decisionCases) {
            Object.entries(task.decisionCases).forEach(([condition, tasks], i) => {
                if (tasks.length > 0) {
                    processTask(tasks[0], nodes.length, nodeId, condition, condition);
                    for (let j = 1; j < tasks.length; j++) {
                        processTask(tasks[j], nodes.length);
                    }
                }
            });

            if (task.defaultCase && task.defaultCase.length > 0) {
                processTask(task.defaultCase[0], nodes.length, nodeId, "default", "default");
                for (let j = 1; j < task.defaultCase.length; j++) {
                    processTask(task.defaultCase[j], nodes.length);
                }
            }
        }

        return nodeId;
    };

    processedWorkflow.tasks.forEach((task: Task, index: number) => {
        const parentId = index > 0 ? nodes[nodes.length - 1].id : undefined;
        processTask(task, nodes.length, parentId);
    });

    return {nodes, edges};
};
